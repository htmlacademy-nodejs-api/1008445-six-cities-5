import { IMiddleware } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/index.js';

function isValidLimit(limit: unknown) {
  return typeof limit === 'string' &&
    !isNaN(Number(limit)) &&
    parseInt(limit, 10) > 0;
}

export class ValidateLimitMiddleware implements IMiddleware {
  constructor(private param: string) {}

  execute({ query }: Request, _res: Response, next: NextFunction) {
    const limit = query[ this.param ];
    if (!limit) {
      return next();
    }
    if (isValidLimit(limit)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `Limit of offers '${ limit }' must be a positive number`,
      'ValidateCityMiddleware'
    );
  }
}
