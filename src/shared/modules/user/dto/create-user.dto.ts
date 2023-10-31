import { CREATE_USER_VALIDATION_MESSAGES } from './create-user.messages.js';
import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: CREATE_USER_VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT })
  public email: string;

  @IsString({ message: CREATE_USER_VALIDATION_MESSAGES.AVATAR_URL.INVALID_FORMAT })
  public avatarUrl: string;

  @IsString({ message: CREATE_USER_VALIDATION_MESSAGES.NAME.INVALID_FORMAT })
  @Length(1, 15, { message: CREATE_USER_VALIDATION_MESSAGES.NAME.LENGTH_FIELD })
  public name: string;

  @IsString({ message: CREATE_USER_VALIDATION_MESSAGES.PASSWORD.INVALID_FORMAT })
  @Length(6, 12, { message: CREATE_USER_VALIDATION_MESSAGES.PASSWORD.LENGTH_FIELD })
  public password: string;

  @IsBoolean({ message: CREATE_USER_VALIDATION_MESSAGES.IS_PRO.INVALID_FORMAT })
  public isPro: boolean;
}
