import { IsEmail, IsString } from 'class-validator';
import { LoginUserMessages } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, { message: LoginUserMessages.EMAIL.INVALID_FORMAT })
  public email: string;

  @IsString({ message: LoginUserMessages.PASSWORD.INVALID_FORMAT })
  public password: string;
}
