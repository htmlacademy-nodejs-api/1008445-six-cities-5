import { inject, injectable } from 'inversify';
import { BaseController, HttpError } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { Request, Response } from 'express';
import { IFavoriteService } from './favorite-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { StatusCodes } from 'http-status-codes';
import { OfferRdo } from '../offer/rdo/offer.rdo.js';
import { IOfferService } from '../offer/index.js';
import { OfferController } from '../offer/offer.controller.js';
import { FAVORITE_STATUS, NOT_FAVORITE_STATUS } from './favorite.constant.js';

@injectable()
export class FavoriteController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.FavoriteService) private readonly favoriteService: IFavoriteService,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoriteController');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.getFavorites });
    this.addRoute({ path: '/:offerId/:status', method: HttpMethod.Post, handler: this.setFavorite });
  }

  public async getFavorites(_req: Request, res: Response): Promise<void> {
    //TODO get header token
    const userId = '652962c756dbfdfd2d5dd159';
    const offers = await this.favoriteService.findFavorites(userId);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async setFavorite(req: Request, res: Response): Promise<void> {
    //TODO get header token
    const { offerId, status } = req.params;
    if (![ FAVORITE_STATUS, NOT_FAVORITE_STATUS ].includes(status)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Favorite status of offer id '${ offerId }' is incorrect, must be 0 or 1`,
        'OfferController'
      );
    }
    await OfferController.validateOffer(offerId, this.offerService);
    //const userId = '652962c756dbfdfd2d5dd159';
    const offers = await this.favoriteService.setOfferFavoriteStatus(offerId, status);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }
}
