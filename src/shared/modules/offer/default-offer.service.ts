import { IOfferService } from './offer-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { inject, injectable } from 'inversify';
import { Component, SortType } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { CreateOfferDto } from '../offer/index.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { UpdateOfferDto } from './dto/update.offer-dto.js';
import mongoose from 'mongoose';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const offer = await this.offerModel.create(dto);
    this.logger.info(`New offer created ${ offer.id }`);
    return offer;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const [ offer ] = await this.offerModel
      .aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(offerId) } },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'offerId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            rating: {
              $divide: [
                {
                  $reduce: {
                    input: '$reviews',
                    initialValue: 0,
                    in: { $add: ['$$value', '$$this.rating'] },
                  },
                },
                {
                  $cond: {
                    if: { $ne: [ { $size: '$reviews' }, 0 ] },
                    then: { $size: '$reviews' },
                    else: 1,
                  },
                },
              ],
            },
            reviewsCount: { $size: '$reviews' },
          },
        },
        { $unset: 'reviews' },
      ])
      .exec();
    return offer;
  }

  public async find(limit?: string): Promise<DocumentType<OfferEntity>[]> {
    const offersLimit = limit ? parseInt(limit, 10) : DEFAULT_OFFER_COUNT;
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'offerId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            rating: {
              $divide: [
                {
                  $reduce: {
                    input: '$reviews',
                    initialValue: 0,
                    in: { $add: ['$$value', '$$this.rating'] },
                  },
                },
                {
                  $cond: {
                    if: { $ne: [ { $size: '$reviews' }, 0 ] },
                    then: { $size: '$reviews' },
                    else: 1,
                  },
                },
              ],
            },
            reviewsCount: { $size: '$reviews' },
          },
        },
        { $unset: 'reviews' },
        { $limit: offersLimit },
        { $sort: { createdAt: SortType.Down } },
      ])
      .exec();
  }

  public async findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find(
        { 'city.name': city, isPremium: true },
        {},
        { limit: DEFAULT_PREMIUM_OFFER_COUNT })
      .populate([ 'userId' ])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
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
}
