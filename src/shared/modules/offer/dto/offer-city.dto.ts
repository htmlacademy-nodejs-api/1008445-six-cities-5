import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CREATE_OFFER_VALIDATION_MESSAGE } from './create-offer.messages.js';
import { City } from '../../../types/city.enum.js';
import { LocationDto } from './offer-location.dto.js';

export class OfferCityDto {
  @IsEnum(City, { message: CREATE_OFFER_VALIDATION_MESSAGE.CITY.INVALID })
  public name: City;

  @ValidateNested()
  @Type(() => LocationDto)
  public location: LocationDto;
}
