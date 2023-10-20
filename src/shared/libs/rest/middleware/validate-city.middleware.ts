import { IMiddleware } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { City } from '../../../types/city.enum.js';

export class ValidateCityMiddleware implements IMiddleware {
  constructor(private param: string) {}

  execute({ params }: Request, _res: Response, next: NextFunction) {
    const city = params[ this.param ];
    const currentCity = city as City;
    if (Object.values(City).includes(currentCity)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `City with name '${ city }' is not exist`,
      'ValidateCityMiddleware'
    );
  }
}
