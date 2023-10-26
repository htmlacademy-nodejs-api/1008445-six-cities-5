import { OfferType } from '../../../types/index.js';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { Type } from 'class-transformer';
import { LocationDto } from './offer-location.dto.js';
import { Goods } from '../../../types/goods.enum.js';
import { OfferCityDto } from './offer-city.dto.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @ValidateNested()
  @Type(() => OfferCityDto)
  public city: OfferCityDto;

  @MaxLength(256, { message: CreateOfferValidationMessage.image.maxLength })
  public previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat })
  public photos: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalid })
  public type: OfferType;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.price.minValue })
  @Max(8, { message: CreateOfferValidationMessage.price.maxValue })
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.goods.invalidFormat })
  @IsEnum(Goods, { each: true, message: CreateOfferValidationMessage.goods.invalid })
  public goods: Goods[];

  public userId: string;

  @ValidateNested()
  @Type(() => LocationDto)
  public location: LocationDto;
}
