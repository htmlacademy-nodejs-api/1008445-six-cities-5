import { IOfferService } from './offer-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { inject, injectable } from 'inversify';
import { Component, SortType } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { CreateOfferDto } from '../offer/index.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { UpdateOfferDto } from './dto/update.offer-dto.js';

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
    return this
      .offerModel
      .findById(offerId)
      .populate([ 'userId' ])
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return await this.offerModel
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
                    in: {
                      $add: ['$$value', '$$this.rating'],
                    },
                  },
                },
                {
                  $cond: [
                    {
                      $ne: [
                        {
                          $size: '$reviews',
                        },
                        0,
                      ],
                    },
                    {
                      $size: '$reviews',
                    },
                    1,
                  ],
                },
              ],
            },
            reviewsCount: {
              $size: '$reviews',
            },
          },
        },
        { $unset: 'reviews' },
        { $limit: limit },
        { $sort: { createdAt: SortType.Down } },
      ])
      .exec();
  }

  public async findPremiumByCity(city: string, isPremium: boolean = true): Promise<DocumentType<OfferEntity>[]> {
    const limit = DEFAULT_PREMIUM_OFFER_COUNT;
    return this.offerModel
      .find({ city, isPremium }, {}, { limit })
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
