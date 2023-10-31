import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';

export interface IFavoriteService {
  findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
  addOrRemoveOfferFavoriteStatus(userId: string, offerId: string, status: string): Promise<DocumentType<OfferEntity> | null>;
}
