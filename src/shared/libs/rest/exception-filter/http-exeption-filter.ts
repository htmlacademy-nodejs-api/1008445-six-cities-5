import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { IExceptionFilter } from './exception-filter.interface.js';
import { Component } from '../../../types/index.js';
import { ILogger } from '../../logger/index.js';
import { createErrorObject } from '../../../helpers/index.js';
import { ApplicationError } from '../types/application-error.enum.js';
import { HttpError } from '../errors/index.js';
@injectable()
export class HttpExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('Register HttpExceptionFilter');
  }

  public catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }
    this.logger.error(`[HttpException]: ${ req.path } # ${ error.message }`, error);

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(
        ApplicationError.CommonError,
        error.message
      ));
  }
}
