import { IMiddleware } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { ParamOfferId } from '../../../modules/offer/types/param-offer-id.type.js';
import { IOfferService } from '../../../modules/offer/index.js';

export class ValidateOfferExistMiddleware implements IMiddleware {
  private readonly offerService: IOfferService;
  constructor(offerService: IOfferService) {
    this.offerService = offerService;
  }

  async execute({ params }: Request<ParamOfferId>, _res: Response, next: NextFunction) {
    const { offerId } = params;
    const offer = await this.offerService.exists(offerId);
    if (offer) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `Offer with id '${ offerId }' is not exist`,
      'ValidateObjectIdMiddleware'
    );
  }
}
