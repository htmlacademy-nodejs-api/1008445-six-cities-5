import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { ReviewEntity } from './review.entity.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { IReviewService } from './review-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { DEFAULT_REVIEW_COUNT } from './review.constant.js';

@injectable()
export class DefaultReviewService implements IReviewService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.ReviewModel) private readonly reviewModel: types.ModelType<ReviewEntity>,
  ) {}

  public async create(dto: CreateReviewDto): Promise<DocumentType<ReviewEntity>> {
    const review = await this.reviewModel.create(dto);
    this.logger.info(`New review of offer '${ dto.offerId }' created`);
    return review;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<ReviewEntity>[]> {
    return this.reviewModel
      .find(
        { offerId },
        {},
        { limit: DEFAULT_REVIEW_COUNT })
      .sort({ createdAt: SortType.Down })
      .populate([ 'userId' ])
      .exec();
  }

  findById(reviewId: string): Promise<DocumentType<ReviewEntity> | null> {
    return this
      .reviewModel
      .findById(reviewId)
      .populate([ 'userId' ])
      .exec();
  }

  deleteByOfferId(offerId: string) {
    return this
      .reviewModel
      .deleteMany({ offerId })
      .populate([ 'userId' ])
      .exec();
  }
}
