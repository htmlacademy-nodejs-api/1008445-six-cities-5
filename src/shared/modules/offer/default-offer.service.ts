import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { IOfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { CreateOfferDto } from '../offer/index.js';
import { DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { UpdateOfferDto } from './dto/update.offer-dto.js';
import { getFullOfferPipeline, getOfferPipeline } from './offer-pipeline.utils.js';
import { City } from '../../types/city.enum.js';

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

  public async findById(currentUserId: string, offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const pipeline = getFullOfferPipeline(offerId, currentUserId);
    const [ offer ] = await this.offerModel.aggregate(pipeline).exec();
    return offer;
  }

  public async find(currentUserId: string, limit?: string): Promise<DocumentType<OfferEntity>[]> {
    const pipeline = getOfferPipeline(currentUserId, limit);
    return this.offerModel.aggregate(pipeline).exec();
  }

  public async findPremiumByCity(city: City): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find(
        { 'city.name': city, isPremium: true },
        {},
        { limit: DEFAULT_PREMIUM_OFFER_COUNT })
      .sort({ postDate: SortType.Down })
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
