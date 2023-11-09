import UserDto from '../../dto/user/user.dto';
import { City, Type, Location } from '../../types/types';

export default class OfferDto {
  public id!: string;
  public title!: string;
  public description!: string;
  public city!: City;
  public previewImage!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public type!: Type;
  public bedrooms!: number;
  public maxAdults!: number;
  public price!: number;
  public goods!: string[];
  public author!: UserDto;
  public location!: Location;
  public reviewsCount!: number;
  public isFavorite!: boolean;
}
