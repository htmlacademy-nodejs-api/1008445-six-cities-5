import { IsLatitude, IsLongitude, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CREATE_OFFER_VALIDATION_MESSAGE } from './create-offer.messages.js';

export class LocationDto {
  @IsNumber()
  @Type(() => Number)
  @IsLatitude({ message: CREATE_OFFER_VALIDATION_MESSAGE.LOCATION.INVALID_FORMAT })
  public latitude: number;

  @IsNumber()
  @Type(() => Number)
  @IsLongitude({ message: CREATE_OFFER_VALIDATION_MESSAGE.LOCATION.INVALID_FORMAT })
  public longitude: number;
}
