import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { IOfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { CreateOfferDto } from '../offer/index.js';
import { OFFER_OPTIONS } from './offer.constant.js';
import { UpdateOfferDto } from './dto/update.offer-dto.js';
import { getOfferPipeline, getLimitPipeline, sortPipeline } from './offer-pipeline.js';
import { City } from '../../types/city.enum.js';
import { UserEntity } from '../user/index.js';
import {
  authorPipeline,
  commentsPipeline,
  projectPipeline,
  getUserPipeline,
} from './offer-pipeline.js';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const offer = await this.offerModel.create(dto);
    this.logger.info(`New offer created ${ offer.id }`);
    return offer;
  }

  public async findById(currentUserId: string, offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const [ offer ] = await this.offerModel
      .aggregate([
        {
          $match: {
            $expr: {
              $eq: [ '$_id', { $toObjectId: offerId }],
            },
          },
        },
        ...getOfferPipeline(currentUserId),
      ])
      .exec();
    return offer;
  }

  public async find(currentUserId: string, limit?: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate([
      sortPipeline,
      getLimitPipeline(limit),
      ...getOfferPipeline(currentUserId),
    ])
      .exec();
  }

  public async findPremiumByCity(city: City): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find(
        { 'city.name': city, isPremium: true },
        {},
        { limit: OFFER_OPTIONS.DEFAULT_PREMIUM_OFFER_COUNT })
      .sort({ postDate: SortType.Down })
      .populate([ 'userId' ])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate([ 'userId' ])
      .exec();
  }

  public async exists(offerId: string): Promise<boolean> {
    const offer = await this.offerModel.exists({ _id: offerId });
    return offer !== null;
  }

  public async incReviewsCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, { '$inc': { reviewsCount: 1 } })
      .exec();
  }

  public async updateImagesById(userId: string, offerId: string, file: Express.Multer.File) {
    await this.offerModel
      .updateOne(
        { _id: offerId },
        { [ 'push' ]: { photos: file } })
      .exec();
    return this.offerModel.findById(userId, offerId).exec();
  }

  public async addOrRemoveOfferFavoriteStatus(userId: string, offerId: string, status: string) {
    const isSetStatus = status === '1';
    await this.userModel
      .updateOne(
        { _id: userId },
        { [`$${ isSetStatus ? 'push' : 'pull' }`]: { favoriteOffers: offerId } })
      .exec();

    this.logger.info(`${ isSetStatus ? 'Add' : 'Remove' } offer id '${ offerId }'
      ${ isSetStatus ? 'in' : 'from' } favorites of user = '${ userId }'`);

    const [ offer ] = await this.offerModel
      .aggregate([
        {
          $match: {
            $expr: {
              $eq: [ '$_id', { $toObjectId: offerId }],
            },
          },
        },
        ...getOfferPipeline(userId),
      ])
      .exec();
    return offer;
  }

  public async findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        ...getUserPipeline(userId),
        {
          $match: {
            $expr: {
              $in: [{ $toString: '$_id' }, '$user.favoriteOffers'],
            },
          },
        },
        sortPipeline,
        ...commentsPipeline,
        ...authorPipeline,
        ...projectPipeline,
      ])
      .exec();
  }
}
