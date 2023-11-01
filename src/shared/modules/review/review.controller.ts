import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  DocumentExistsMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
  PrivateRouteMiddleware
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { IReviewService } from './review-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { ReviewRdo } from './rdo/review.rdo.js';
import { CreateReviewRequest } from './types/create-review-request-type.js';
import { IOfferService } from '../offer/index.js';
import { ParamOfferId } from '../offer/types/param-offer-id.type.js';
import { CreateReviewDto } from './dto/create-review.dto.js';

@injectable()
export class ReviewController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.ReviewService) private readonly reviewService: IReviewService,
    @inject(Component.OfferService) private readonly offerService: IOfferService
  ) {
    super(logger);

    this.logger.info('Register routes for ReviewController');
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateReviewDto)
      ]
    });
  }

  public async index(req: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = req.params;
    const reviews = await this.reviewService.findByOfferId(offerId);
    const responseData = fillDTO(ReviewRdo, reviews);
    this.ok(res, responseData);
  }

  public async create({ body, tokenPayload }: CreateReviewRequest, res: Response): Promise<void> {
    const { id } = await this.reviewService.create({ ...body, userId: tokenPayload.id });
    await this.offerService.incReviewsCount(body.offerId);
    const review = await this.reviewService.findById(id);
    this.created(res, fillDTO(ReviewRdo, review));
  }
}
