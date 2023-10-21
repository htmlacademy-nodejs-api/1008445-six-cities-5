import { inject, injectable } from 'inversify';
import { BaseController, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
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

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService
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
      middlewares: [ new ValidateDtoMiddleware(CreateOfferDto) ]
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

  public async index({ query }: Request<unknown, unknown, unknown, RequestQuery>, res: Response): Promise<void> {
    const { limit } = query;
    const offers = await this.offerService.find(limit);
    const responseData = fillDTO(OfferRdo, offers.slice(0, 1));
    this.ok(res, responseData);
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId} = params;
    const offer = await this.offerService.findById(offerId);
    const responseData = fillDTO(FullOfferRdo, offer);
    this.ok(res, responseData);
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    //TODO get header token
    const { id } = await this.offerService.create(body);
    const offer = await this.offerService.findById(id);
    this.created(res, fillDTO(FullOfferRdo, offer));
  }

  public async update({ body, params }: UpdateOfferRequest, res: Response): Promise<void> {
    //TODO get header token
    const { offerId } = params;
    const offer = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDTO(FullOfferRdo, offer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    //TODO get header token
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    //TODO delete reviews
    this.noContent(res, offer);
  }

  public async getPremiumByCity({ params }: Request<ParamCity>, res: Response): Promise<void> {
    const { city } = params;
    const currentCity = city as City;
    const offers = await this.offerService.findPremiumByCity(currentCity);
    this.ok(res, fillDTO(FullOfferRdo, offers));
  }
}
