import { inject, injectable } from 'inversify';
import {
  BaseController,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { Request, Response } from 'express';
import { IOfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { FullOfferRdo } from './rdo/full-offer.rdo.js';
import { CreateOfferRequest } from './types/create-offer-request-type.js';
import { UpdateOfferRequest } from './update-offer-request-type.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { City } from '../../types/city.enum.js';
import { ParamOfferId } from './types/param-offer-id.type.js';
import { ParamCity } from './types/param-city.type.js';
import { RequestQuery } from './types/request-query.type.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update.offer-dto.js';
import { ValidateCityMiddleware } from '../../libs/rest/index.js';
import { ValidateLimitMiddleware } from '../../libs/rest/index.js';
import { DocumentExistsMiddleware } from '../../libs/rest/index.js';
import { IReviewService } from '../review/review-service.interface.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
    @inject(Component.ReviewService) private readonly reviewService: IReviewService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [ new ValidateLimitMiddleware('limit') ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.getPremiumByCity,
      middlewares: [ new ValidateCityMiddleware('city')]
    });
  }

  public async index({ query, tokenPayload }: Request<unknown, unknown, unknown, RequestQuery>, res: Response): Promise<void> {
    const { limit } = query;
    const userId = tokenPayload ? tokenPayload.id : null;
    const offers = await this.offerService.find(userId, limit);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async show({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId} = params;
    const userId = tokenPayload ? tokenPayload.id : null;
    const offer = await this.offerService.findById(userId, offerId);
    const responseData = fillDTO(FullOfferRdo, offer);
    this.ok(res, responseData);
  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const userId = tokenPayload.id;
    const { id } = await this.offerService.create({ ...body, userId });
    const offer = await this.offerService.findById(userId,id);
    this.created(res, fillDTO(FullOfferRdo, offer));
  }

  public async update({ body, params }: UpdateOfferRequest, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDTO(FullOfferRdo, offer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    await this.reviewService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async getPremiumByCity({ params }: Request<ParamCity>, res: Response): Promise<void> {
    const { city } = params;
    const currentCity = city as City;
    const offers = await this.offerService.findPremiumByCity(currentCity);
    this.ok(res, fillDTO(FullOfferRdo, offers));
  }
}
