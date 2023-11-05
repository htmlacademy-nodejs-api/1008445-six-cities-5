import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  PrivateRouteMiddleware,
  UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { IOfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { FullOfferRdo } from './rdo/full-offer.rdo.js';
import { CreateOfferRequest } from './types/create-offer-request-type.js';
import { UpdateOfferRequest } from './update-offer-request-type.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { ParamOfferId } from './types/param-offer-id.type.js';
import { ParamCity } from './types/param-city.type.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update.offer-dto.js';
import { ValidateCityMiddleware } from '../../libs/rest/index.js';
import { ValidateLimitMiddleware } from '../../libs/rest/index.js';
import { DocumentExistsMiddleware } from '../../libs/rest/index.js';
import { IReviewService } from '../review/review-service.interface.js';
import { City } from '../../types/city.enum.js';
import { RequestQuery } from './types/request-query.type.js';
import { UploadPreviewImageRdo } from './rdo/upload-preview-image.rdo.js';
import { IConfig, TRestSchema } from '../../libs/config/index.js';
import { UploadImageRdo } from './rdo/upload-image.rdo.js';
import { UploadMultiplyFilesMiddleware } from '../../libs/rest/middleware/upload-files.middleware.js';

function isFileArray(value: unknown): value is Express.Multer.File[] {
  return Array.isArray(value) && value.every((item) => 'filename' in item);
}

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
    @inject(Component.ReviewService) private readonly reviewService: IReviewService,
    @inject(Component.Config) private readonly configService: IConfig<TRestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [ new ValidateLimitMiddleware('limit') ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.getPremiumByCity,
      middlewares: [ new ValidateCityMiddleware('city')]
    });
    this.addRoute({
      path: '/:offerId/previewImage',
      method: HttpMethod.Post,
      handler: this.uploadPreviewImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'previewImage'),
      ]
    });
    this.addRoute({
      path: '/:offerId/image',
      method: HttpMethod.Post,
      handler: this.uploadImages,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadMultiplyFilesMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'photos'),
      ]
    });
  }

  public async index({ query, tokenPayload }: Request<unknown, unknown, unknown, RequestQuery>, res: Response): Promise<void> {
    const { limit } = query;
    const userId = tokenPayload ? tokenPayload.id : null;
    const offers = await this.offerService.find(userId, limit);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async show({ params: { offerId }, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const userId = tokenPayload ? tokenPayload.id : null;
    const offer = await this.offerService.findById(userId, offerId);
    const responseData = fillDTO(FullOfferRdo, offer);
    this.ok(res, responseData);
  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const userId = tokenPayload.id;
    const { id } = await this.offerService.create({ ...body, userId });
    const offer = await this.offerService.findById(userId,id);
    this.created(res, fillDTO(FullOfferRdo, offer));
  }

  public async update({ body, params: { offerId } }: UpdateOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDTO(FullOfferRdo, offer));
  }

  public async delete({ params: { offerId } }: Request<ParamOfferId>, res: Response): Promise<void> {
    const offer = await this.offerService.deleteById(offerId);
    await this.reviewService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async getPremiumByCity({ params: { city } }: Request<ParamCity>, res: Response): Promise<void> {
    const offers = await this.offerService.findPremiumByCity(city as City);
    this.ok(res, fillDTO(FullOfferRdo, offers));
  }

  public async uploadPreviewImage({ params, file } : Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const updateDto = { previewImage: file?.filename };
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadPreviewImageRdo, updateDto));
  }

  public async uploadImages({ params, files } : Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    if (isFileArray(files)) {
      const updateDto = { photos: files.map(({ filename }: Express.Multer.File) => filename) };
      await this.offerService.updateById(offerId, updateDto);
      this.created(res, fillDTO(UploadImageRdo, updateDto));
    }
  }
}
