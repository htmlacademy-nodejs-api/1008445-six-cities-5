import { OfferType } from '../../../types/index.js';
import { TCity } from '../../../types/city.type.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: TCity;
  public previewImage?: string;
  public photo?: string;
  public isFavorite?: boolean;
  public isPremium?: boolean;
  public rating?: number;
  public type?: OfferType;
  public bedrooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: string[];
  public location?: object;
}
