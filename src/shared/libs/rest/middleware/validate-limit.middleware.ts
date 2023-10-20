import { IMiddleware } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { isNumeric } from '../../../../utils.js';

export class ValidateLimitMiddleware implements IMiddleware {
  constructor(private param: string) {}

  execute({ query }: Request, _res: Response, next: NextFunction) {
    const limit = query[ this.param ];
    if (!limit) {
      return next();
    }
    const offerLimit = limit as string;
    if (isNumeric(offerLimit) && parseInt(offerLimit, 10) > 0) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `Limit of offers '${ limit }' must be a positive number`,
      'ValidateCityMiddleware'
    );
  }
}
