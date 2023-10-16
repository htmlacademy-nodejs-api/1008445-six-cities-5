import { inject, injectable } from 'inversify';
import { BaseController, HttpError } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { Request, Response } from 'express';
import { IOfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { FullOfferRdo } from './rdo/full-offer.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './create-offer-request-type.js';
import { UpdateOfferRequest } from './update-offer-request-type.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { City } from '../../types/city.enum.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.getFullOffer });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Put, handler: this.editOffer });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.deleteOffer });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.getPremiumByCity });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const { limit } = req.query;
    const offerCount = limit ? +limit : undefined;
    const offers = await this.offerService.find(offerCount);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async getFullOffer(req: Request, res: Response): Promise<void> {
    const { offerId} = req.params;
    await OfferController.validateOffer(offerId, this.offerService);
    const offer = await this.offerService.findById(offerId);
    const responseData = fillDTO(FullOfferRdo, offer);
    this.ok(res, responseData);
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    //TODO get header token
    const offer = await this.offerService.create(body);
    this.created(res, fillDTO(FullOfferRdo, offer));
  }

  public async editOffer({ body, params }: UpdateOfferRequest, res: Response): Promise<void> {
    //TODO get header token
    const { offerId } = params;
    await OfferController.validateOffer(offerId as string, this.offerService);
    const offer = await this.offerService.updateById(offerId as string, body);
    this.ok(res, fillDTO(FullOfferRdo, offer));
  }

  public async deleteOffer(req: Request, res: Response): Promise<void> {
    //TODO get header token
    const { offerId } = req.params;
    await OfferController.validateOffer(offerId, this.offerService);
    const offer = await this.offerService.deleteById(offerId);
    //TODO delete reviews
    this.noContent(res, fillDTO(FullOfferRdo, offer));
  }

  public async getPremiumByCity(req: Request, res: Response): Promise<void> {
    const { city } = req.params;
    if (!Object.values(City).includes(city as City)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `City name '${ city }' is incorrect`,
        'OfferController'
      );
    }
    const offers = await this.offerService.findPremiumByCity(city as City);
    this.ok(res, fillDTO(FullOfferRdo, offers));
  }

  static async validateOffer(offerId: string, offerService: IOfferService) {
    if (!offerId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Offer id '${ offerId }' is incorrect`,
        'OfferController'
      );
    }
    const isExist = await offerService.exists(offerId);
    if (!isExist) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer id "${ offerId }" not found`,
        'OfferController'
      );
    }
  }
}
