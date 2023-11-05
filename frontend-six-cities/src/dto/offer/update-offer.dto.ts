import { City, Location } from '../../types/types';

export default class CreateOrUpdateOfferDto {
  public id?: string;
  public title?: string;
  public description?: string;
  public city?: City;
  public previewImage?: string;
  public photos?: string[];
  public isPremium?: boolean;
  public type?: string;
  public bedrooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: string[];
  public location?: Location;
  public postDate?: Date;
}
