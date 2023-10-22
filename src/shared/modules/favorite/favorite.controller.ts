import { inject, injectable } from 'inversify';
import { BaseController, DocumentExistsMiddleware, ValidateObjectIdMiddleware, ValidateStatusMiddleware } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { Request, Response } from 'express';
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
      handler: this.index
    });
    this.addRoute({
      path: '/:offerId/:status',
      method: HttpMethod.Post,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateStatusMiddleware('status'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    //TODO get header token
    const offers = await this.favoriteService.findFavorites();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async update(req: Request, res: Response): Promise<void> {
    //TODO get header token
    const { offerId, status } = req.params;
    const offer = await this.favoriteService.addOrRemoveOfferFavoriteStatus(offerId, status);
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }
}
