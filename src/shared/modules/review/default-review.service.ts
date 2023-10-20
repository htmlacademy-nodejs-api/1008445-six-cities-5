import { IReviewService } from './review-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { ReviewEntity } from './review.entity.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';

@injectable()
export class DefaultReviewService implements IReviewService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.ReviewModel) private readonly reviewModel: types.ModelType<ReviewEntity>,
  ) {}

  public async create(offerId: string, dto: CreateReviewDto): Promise<DocumentType<ReviewEntity>> {
    const review = await this.reviewModel.create(dto);
    this.logger.info(`New review of offer '${ offerId }' created`);
    return review;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<ReviewEntity>[]> {
    return this.reviewModel
      .find({ offerId })
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
}
