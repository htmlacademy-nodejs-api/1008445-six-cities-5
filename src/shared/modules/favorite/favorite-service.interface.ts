import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';

export interface IFavoriteService {
  findFavorites(offerId: string): Promise<DocumentType<OfferEntity>[]>;
  setOfferFavoriteStatus(offerId: string, status: string): Promise<DocumentType<OfferEntity> | null>;
}
