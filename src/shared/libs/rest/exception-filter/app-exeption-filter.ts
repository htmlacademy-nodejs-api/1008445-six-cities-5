import { inject, injectable } from 'inversify';
import { IExceptionFilter } from './exception-filter.interface.js';
import { NextFunction, Request, Response } from 'express';
import { Component } from '../../../types/index.js';
import { ILogger } from '../../logger/index.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/index.js';
import { createErrorObject } from '../../../helpers/index.js';
@injectable()
export class AppExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('Register AppExceptionFilter');
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[ ${ error.detail } ]: ${ error.httpStatusCode } - ${ error.message }`, error);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message));
  }

  catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }
    this.handleOtherError(error, req, res, next);
  }
}
