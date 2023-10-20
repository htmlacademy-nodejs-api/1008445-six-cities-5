import { IFavoriteService } from './favorite-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { UserEntity } from '../user/index.js';

@injectable()
export class DefaultFavoriteService implements IFavoriteService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public async addOrRemoveOfferFavoriteStatus(offerId: string, status: string) {
    //TODO get userId from token
    const userId = '6532955b5da3fa262da1acef';
    await this.userModel
      .updateOne(
        { _id: userId },
        { [`$${ status === '1' ? 'push' : 'pull' }`]: { favoriteOffers: offerId } })
      .exec();

    this.logger.info(`${ status === '1' ? 'Add' : 'Remove' } offer id '${ offerId }' ${ status === '1' ? 'in' : 'from' } favorites of user = '${ userId }'`);
    return this
      .offerModel
      .findById(offerId)
      .populate([ 'userId' ])
      .exec();
  }

  public async findFavorites(): Promise<DocumentType<OfferEntity>[]> {
    //TODO get userId from token
    const userId = '6532955b5da3fa262da1acef';
    const { favoriteOffers} = await this.userModel.findById(userId).exec() as UserEntity;
    return this.offerModel.find({ '_id': { $in: favoriteOffers } });
  }
}
