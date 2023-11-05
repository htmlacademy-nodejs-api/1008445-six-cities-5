import { StatusCodes } from 'http-status-codes';
import { BaseUserException } from './base-user.exception.js';

export class UserNotFoundException extends BaseUserException {
  constructor(email: string) {
    super(StatusCodes.NOT_FOUND, `User with ${ email } not found`, 'AuthController');
  }
}
