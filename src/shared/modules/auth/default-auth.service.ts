import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';
import { Config } from 'convict';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { IAuthService } from './auth-service.interface.js';
import { TRestSchema } from '../../libs/config/index.js';
import { TTokenPayload } from './types/token-payload.js';
import { JWT_OPTIONS } from './auth.constant.js';
import { LoginUserDto, UserEntity, IUserService } from '../user/index.js';
import { UserNotFoundException, UserPasswordIncorrectException } from './errors/index.js';

@injectable()
export class DefaultAuthService implements IAuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: Config<TRestSchema>,
    @inject(Component.UserService) private readonly userService: IUserService,
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TTokenPayload = {
      email: user.email,
      name: user.name,
      id: user.id
    };
    this.logger.info(`Create token for ${ user.email }`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_OPTIONS.JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_OPTIONS.JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      this.logger.warn(`User with ${ dto.email } not found`);
      throw new UserNotFoundException(dto.email);
    }
    if (!user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${ dto.email }`);
      throw new UserPasswordIncorrectException(dto.email);
    }

    return user;
  }
}
