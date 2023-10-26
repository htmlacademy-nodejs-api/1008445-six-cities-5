import { IMiddleware } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { City } from '../../../types/city.enum.js';

function isCity(city: unknown): city is City[ keyof City ] {
  return typeof city === 'string' && Object.values(City).includes(city as City);
}

export class ValidateCityMiddleware implements IMiddleware {
  constructor(private param: string) {}

  execute({ params }: Request, _res: Response, next: NextFunction) {
    const city = params[ this.param ];
    if (isCity(city)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `City with name '${ city }' is not exist`,
      'ValidateCityMiddleware'
    );
  }
}
