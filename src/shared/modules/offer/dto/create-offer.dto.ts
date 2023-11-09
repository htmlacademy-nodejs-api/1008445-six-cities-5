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
import { CREATE_OFFER_RESTRICTIONS } from './create-offer.dto.constant.js';

export class CreateOfferDto {
  @MinLength(CREATE_OFFER_RESTRICTIONS.TITLE_MIN_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(CREATE_OFFER_RESTRICTIONS.TITLE_MAX_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title: string;

  @MinLength(CREATE_OFFER_RESTRICTIONS.DESCRIPTION_MIN_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(CREATE_OFFER_RESTRICTIONS.DESCRIPTION_MAX_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
  public description: string;

  @IsDateString({}, { message: CREATE_OFFER_VALIDATION_MESSAGE.POST_DATE.INVALID_FORMAT })
  public postDate: Date;

  @ValidateNested()
  @Type(() => OfferCityDto)
  public city: OfferCityDto;

  @MaxLength(CREATE_OFFER_RESTRICTIONS.PREVIEW_IMAGE_MAX_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.PREVIEW_IMAGE.MAX_LENGTH })
  public previewImage?: string;

  @IsArray({ message: CREATE_OFFER_VALIDATION_MESSAGE.PHOTOS.INVALID_FORMAT })
  public photos?: string[];

  @IsBoolean({ message: CREATE_OFFER_VALIDATION_MESSAGE.IS_PREMIUM.INVALID_FORMAT })
  public isPremium: boolean;

  @IsEnum(OfferType, { message: CREATE_OFFER_VALIDATION_MESSAGE.TYPE.INVALID })
  public type: OfferType;

  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.INVALID_FORMAT })
  @Min(CREATE_OFFER_RESTRICTIONS.BEDROOMS_MIN_VALUE, { message: CREATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.MIN_VALUE })
    @Max(CREATE_OFFER_RESTRICTIONS.BEDROOMS_MAX_VALUE, { message: CREATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.MAX_VALUE })
  public bedrooms: number;

  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.INVALID_FORMAT })
  @Min(CREATE_OFFER_RESTRICTIONS.MAX_ADULTS_MIN_VALUE, { message: CREATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MIN_VALUE })
  @Max(CREATE_OFFER_RESTRICTIONS.MAX_ADULTS_MAX_VALUE, { message: CREATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MAX_VALUE })
  public maxAdults: number;

  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.INVALID_FORMAT })
  @Min(CREATE_OFFER_RESTRICTIONS.PRICE_MIN_VALUE, { message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.MIN_VALUE })
  @Max(CREATE_OFFER_RESTRICTIONS.PRICE_MAX_VALUE, { message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.MAX_VALUE })
  public price: number;

  @IsArray({ message: CREATE_OFFER_VALIDATION_MESSAGE.GOODS.INVALID_FORMAT })
  @IsEnum(Goods, { each: true, message: CREATE_OFFER_VALIDATION_MESSAGE.GOODS.INVALID })
  public goods: Goods[];

  public userId: string;

  @ValidateNested()
  @Type(() => LocationDto)
  public location: LocationDto;
}
