import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  DocumentExistsMiddleware,
  PrivateRouteMiddleware,
  ValidateObjectIdMiddleware,
  ValidateStatusMiddleware
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { IFavoriteService } from './favorite-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { IOfferService, OfferRdo } from '../offer/index.js';

@injectable()
export class FavoriteController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.FavoriteService) private readonly favoriteService: IFavoriteService,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoriteController');
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [ new PrivateRouteMiddleware() ]
    });
    this.addRoute({
      path: '/:offerId/:status',
      method: HttpMethod.Post,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateStatusMiddleware('status'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async index({ tokenPayload }: Request, res: Response): Promise<void> {
    const offers = await this.favoriteService.findFavorites(tokenPayload.id);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async update({ tokenPayload, params }: Request, res: Response): Promise<void> {
    const { offerId, status } = params;
    const offer =
      await this.favoriteService.addOrRemoveOfferFavoriteStatus(tokenPayload.id, offerId, status);
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }
}
