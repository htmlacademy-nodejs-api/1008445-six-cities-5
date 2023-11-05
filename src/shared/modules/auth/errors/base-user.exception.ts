import { HttpError } from '../../../libs/rest/index.js';

export class BaseUserException extends HttpError {
  constructor(httpStatusCode: number, message: string, detail: string) {
    super(httpStatusCode, message, detail);
  }
}
