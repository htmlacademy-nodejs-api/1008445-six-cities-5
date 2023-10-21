import { Expose } from 'class-transformer';
import { OfferType } from '../../../types/index.js';
import { TCity } from '../../../types/city.type.js';

export class OfferRdo {
  @Expose({ name: '_id' })
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
}
