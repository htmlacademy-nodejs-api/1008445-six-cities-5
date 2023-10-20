import { IsLatitude, IsLongitude, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class LocationDto {
  @IsNumber()
  @Type(() => Number)
  @IsLatitude({ message: CreateOfferValidationMessage.location.invalidFormat })
  public latitude: number;

  @IsNumber()
  @Type(() => Number)
  @IsLongitude({ message: CreateOfferValidationMessage.location.invalidFormat })
  public longitude: number;
}
