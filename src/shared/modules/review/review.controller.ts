import { inject, injectable } from 'inversify';
import { BaseController } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { Request, Response } from 'express';
import { IReviewService } from './review-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { ReviewRdo } from './rdo/review.rdo.js';

@injectable()
export class ReviewController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.ReviewService) private readonly reviewService: IReviewService
  ) {
    super(logger);

    this.logger.info('Register routes for ReviewController');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;
    const reviews = await this.reviewService.findByOfferId(offerId);
    const responseData = fillDTO(ReviewRdo, reviews);
    this.ok(res, responseData);
  }
}
