import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';

export interface IFavoriteService {
  findFavorites(): Promise<DocumentType<OfferEntity>[]>;
  addOrRemoveOfferFavoriteStatus(offerId: string, status: string): Promise<DocumentType<OfferEntity> | null>;
}
