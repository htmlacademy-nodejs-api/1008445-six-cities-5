import { Expose } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { OfferType } from '../../../types/index.js';

export class OfferRdo {
  @Expose()
  public _id: string;

  @Expose()
  public title: string;

  @Expose()
  public date: Date;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public price: number;

  @Expose()
  public reviewCount: number;
}
