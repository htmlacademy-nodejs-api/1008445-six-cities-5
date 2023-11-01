import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  BaseController,
  HttpError,
  ValidateDtoMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { IUserService } from './user-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { IConfig, TRestSchema } from '../../libs/config/index.js';
import { CreateUserRequest } from './create-user-request-type.js';
import { LoginUserRequest } from './login-user-request-type.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { IAuthService } from '../auth/index.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.Config) private readonly configService: IConfig<TRestSchema>,
    @inject(Component.AuthService) private readonly authService: IAuthService,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController');
    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [ new ValidateDtoMiddleware(CreateUserDto) ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [ new ValidateDtoMiddleware(LoginUserDto) ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuth
    });
  }

  public async login({ body }: LoginUserRequest, res: Response): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const userData = fillDTO(LoggedUserRdo, user);
    this.ok(res, Object.assign(userData, { token }));
  }

  public async checkAuth({ tokenPayload }: Request, res: Response) {
    const notAuthError = new HttpError(
      StatusCodes.UNAUTHORIZED,
      'Unauthorized',
      'UserController'
    );
    if (!tokenPayload) {
      throw notAuthError;
    }
    const { email } = tokenPayload;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw notAuthError;
    }

    this.ok(res, fillDTO(LoggedUserRdo, user));
  }

  public async create({ body }: CreateUserRequest, res: Response): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);
    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email "${ body.email }" exists`,
        'UserController'
      );
    }
    const user = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, user));
  }
}
