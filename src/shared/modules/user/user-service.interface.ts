import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

export interface IUserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
}
