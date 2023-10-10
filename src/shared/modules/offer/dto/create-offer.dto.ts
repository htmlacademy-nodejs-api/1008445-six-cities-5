import { OfferType } from '../../../types/index.js';
import { City } from '../../../types/city.enum.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: City;
  public previewImage: string;
  public photo: string;
  public isFavorite: boolean;
  public isPremium: boolean;
  public rating: number;
  public type: OfferType;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: string[];
  public userId: string;
  public location: string[];
}
