import { Container } from 'inversify';
import { IReviewService } from './review-service.interface.js';
import { Component } from '../../types/index.js';
import { DefaultReviewService } from './default-review.service.js';
import { types } from '@typegoose/typegoose';
import { ReviewModel, ReviewEntity } from './review.entity.js';

export function createReviewContainer() {
  const reviewContainer = new Container();
  reviewContainer.bind<IReviewService>(Component.ReviewService).to(DefaultReviewService).inSingletonScope();
  reviewContainer.bind<types.ModelType<ReviewEntity>>(Component.ReviewModel).toConstantValue(ReviewModel);

  return reviewContainer;
}
