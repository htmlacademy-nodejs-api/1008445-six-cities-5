import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { OfferEntity } from '../offer/index.js';
import { IFavoriteService } from './favorite-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { UserEntity } from '../user/index.js';

@injectable()
export class DefaultFavoriteService implements IFavoriteService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public async addOrRemoveOfferFavoriteStatus(userId: string, offerId: string, status: string) {
    const isSetStatus = status === '1';
    await this.userModel
      .updateOne(
        { _id: userId },
        { [`$${ isSetStatus ? 'push' : 'pull' }`]: { favoriteOffers: offerId } })
      .exec();

    this.logger.info(`${ isSetStatus ? 'Add' : 'Remove' } offer id '${ offerId }'
      ${ isSetStatus ? 'in' : 'from' } favorites of user = '${ userId }'`);
    return this
      .offerModel
      .findById(offerId)
      .populate([ 'userId' ])
      .exec();
  }

  public async findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const { favoriteOffers} = await this.userModel
      .findById(userId)
      .sort({ postDate: SortType.Down })
      .exec() as UserEntity;
    return this.offerModel.find({ '_id': { $in: favoriteOffers } });
  }
}
