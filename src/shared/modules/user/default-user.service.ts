import { IUserService } from './user-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';

@injectable()
export class DefaultUserService implements IUserService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created ${ user.email }`);
    return result;
  }

  public async check(token: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ token });
  }

  public async logout(token: string) {
    return this.userModel.findOne({ token });
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }

  public async login(email: string, password: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email, password });
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);
    return existedUser ? existedUser : this.create(dto, salt);
  }
}
