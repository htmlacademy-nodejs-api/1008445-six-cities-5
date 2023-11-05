import { Expose } from 'class-transformer';
import { OfferType, TLocation } from '../../../types/index.js';
import { TCity } from '../../../types/city.type.js';
export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: TCity;

  @Expose()
  public previewImage: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public price: number;

  @Expose()
  public reviewsCount: number;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public location: TLocation;
}
