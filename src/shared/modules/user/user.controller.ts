import { inject, injectable } from 'inversify';
import { BaseController, HttpError, ValidateDtoMiddleware } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { Request, Response } from 'express';
import { IUserService } from './user-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { IConfig, TRestSchema } from '../../libs/config/index.js';
import { CreateUserRequest } from './create-user-request-type.js';
import { LoginUserRequest } from './login-user-request-type.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.Config) private readonly configService: IConfig<TRestSchema>,
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
      path: '/logout',
      method: HttpMethod.Delete,
      handler: this.logout
    });
    this.addRoute({
      path: '/check',
      method: HttpMethod.Get,
      handler: this.check
    });
  }

  public async login({ body }: LoginUserRequest, _res: Response): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);
    if (!existUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email "${ body.email }" not found`,
        'UserController'
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async check(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async logout(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
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
