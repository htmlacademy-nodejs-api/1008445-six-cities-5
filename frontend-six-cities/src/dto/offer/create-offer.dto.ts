import { City, Location, Type } from '../../types/types';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public city!: City;
  public previewImage!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public type!: Type;
  public bedrooms!: number;
  public maxAdults!: number;
  public price!: number;
  public goods!: string[];
  public location!: Location;
  public postDate!: string;
}
