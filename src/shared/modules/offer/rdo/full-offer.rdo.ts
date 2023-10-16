import { Expose } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { OfferType } from '../../../types/index.js';

export class FullOfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public date: Date;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public photo: string;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: string[];

  @Expose()
  public userId: string;

  @Expose()
  public location: string[];
}
