import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update.offer-dto.js';
import { City } from '../../types/city.enum.js';
import { IDocumentExists } from '../../libs/rest/index.js';

export interface IOfferService extends IDocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(authUserId: string | null, offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(authUserId: string | null, limit?: number | unknown): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCity(city: City): Promise<DocumentType<OfferEntity>[]>;
  incReviewsCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(offerId: string): Promise<boolean>;
  updateImagesById(authUserId: string | null, offerId: string, file: Express.Multer.File): Promise<DocumentType<OfferEntity> | null>;
  findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
  addOrRemoveOfferFavoriteStatus(userId: string, offerId: string, status: string): Promise<DocumentType<OfferEntity> | null>;
}
