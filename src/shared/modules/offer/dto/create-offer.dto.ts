import { Type } from 'class-transformer';
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
import { OfferType } from '../../../types/index.js';
import { CREATE_OFFER_VALIDATION_MESSAGE } from './create-offer.messages.js';
import { LocationDto } from './offer-location.dto.js';
import { Goods } from '../../../types/goods.enum.js';
import { OfferCityDto } from './offer-city.dto.js';

export class CreateOfferDto {
  @MinLength(10, { message: CREATE_OFFER_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(100, { message: CREATE_OFFER_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title: string;

  @MinLength(20, { message: CREATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(1024, { message: CREATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
  public description: string;

  @IsDateString({}, { message: CREATE_OFFER_VALIDATION_MESSAGE.POST_DATE.INVALID_FORMAT })
  public postDate: Date;

  @ValidateNested()
  @Type(() => OfferCityDto)
  public city: OfferCityDto;

  @MaxLength(256, { message: CREATE_OFFER_VALIDATION_MESSAGE.PREVIEW_IMAGE.MAX_LENGTH })
  public previewImage?: string;

  @IsArray({ message: CREATE_OFFER_VALIDATION_MESSAGE.PHOTOS.INVALID_FORMAT })
  public photos?: string[];

  @IsBoolean({ message: CREATE_OFFER_VALIDATION_MESSAGE.IS_PREMIUM.INVALID_FORMAT })
  public isPremium: boolean;

  @IsEnum(OfferType, { message: CREATE_OFFER_VALIDATION_MESSAGE.TYPE.INVALID })
  public type: OfferType;

  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.INVALID_FORMAT })
  @Min(1, { message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.MIN_VALUE })
  @Max(8, { message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.MAX_VALUE })
  public bedrooms: number;

  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.INVALID_FORMAT })
  @Min(1, { message: CREATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MIN_VALUE })
  @Max(10, { message: CREATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MAX_VALUE })
  public maxAdults: number;

  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.INVALID_FORMAT })
  @Min(100, { message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.MIN_VALUE })
  @Max(100000, { message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.MAX_VALUE })
  public price: number;

  @IsArray({ message: CREATE_OFFER_VALIDATION_MESSAGE.GOODS.INVALID_FORMAT })
  @IsEnum(Goods, { each: true, message: CREATE_OFFER_VALIDATION_MESSAGE.GOODS.INVALID })
  public goods: Goods[];

  public userId: string;

  @ValidateNested()
  @Type(() => LocationDto)
  public location: LocationDto;
}
