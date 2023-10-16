import { IFavoriteService } from './favorite-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';

@injectable()
export class DefaultFavoriteService implements IFavoriteService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  setOfferFavoriteStatus(offerId: string, status: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = this.offerModel
      .findByIdAndUpdate(offerId, { isFavorite: Boolean(status) })
      .populate([ 'userId' ])
      .exec();

    this.logger.info(`Offer id '${ offerId }' favorite status updated ${ status }`);
    return offer;
  }

  findFavorites(userId: string, isFavorite: boolean = true): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ userId, isFavorite })
      .populate([ 'userId' ])
      .exec();
  }
}
