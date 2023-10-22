import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { City } from '../../../types/city.enum.js';
import { LocationDto } from './offer-location.dto.js';

export class OfferCityDto {
  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public name: City;

  @ValidateNested()
  @Type(() => LocationDto)
  public location: LocationDto;
}
