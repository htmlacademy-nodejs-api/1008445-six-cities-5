import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { CREATE_USER_VALIDATION_MESSAGES } from './create-user.messages.js';
import { UserType } from '../../../types/user-type.enum.js';
import { CREATE_USER_RESTRICTIONS } from './create-user.dto.constant.js';

export class CreateUserDto {
  @IsEmail({}, { message: CREATE_USER_VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT })
  public email: string;

  public avatarUrl?: string;

  @IsString({ message: CREATE_USER_VALIDATION_MESSAGES.NAME.INVALID_FORMAT })
  @Length(CREATE_USER_RESTRICTIONS.NAME_MIN_LENGTH, CREATE_USER_RESTRICTIONS.NAME_MAX_LENGTH, { message: CREATE_USER_VALIDATION_MESSAGES.NAME.LENGTH_FIELD })
  public name: string;

  @IsString({ message: CREATE_USER_VALIDATION_MESSAGES.PASSWORD.INVALID_FORMAT })
  @Length(CREATE_USER_RESTRICTIONS.PASSWORD_MIN_LENGTH, CREATE_USER_RESTRICTIONS.PASSWORD_MAX_LENGTH, { message: CREATE_USER_VALIDATION_MESSAGES.PASSWORD.LENGTH_FIELD })
  public password: string;

  @IsEnum(UserType, { each: true, message: CREATE_USER_VALIDATION_MESSAGES.TYPE.INVALID })
  public type: string;
}
