import { Expose, Type } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { OfferType, TLocation } from '../../../types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';
export class FullOfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public photos: string[];

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

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  public location: TLocation;

  @Expose()
  public reviewsCount: number;

  @Expose()
  public isFavorite: boolean;
}
