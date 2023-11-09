import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt, IsOptional, IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator';
import { UPDATE_OFFER_VALIDATION_MESSAGE } from './update-offer.messages.js';
import { Goods } from '../../../types/goods.enum.js';
import { OfferType } from '../../../types/index.js';
import { LocationDto } from './offer-location.dto.js';
import { OfferCityDto } from './offer-city.dto.js';
import { CREATE_OFFER_RESTRICTIONS } from './create-offer.dto.constant.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(CREATE_OFFER_RESTRICTIONS.TITLE_MIN_LENGTH, { message: UPDATE_OFFER_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(CREATE_OFFER_RESTRICTIONS.TITLE_MAX_LENGTH, { message: UPDATE_OFFER_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title?: string;

  @IsOptional()
  @MinLength(CREATE_OFFER_RESTRICTIONS.DESCRIPTION_MIN_LENGTH, { message: UPDATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(CREATE_OFFER_RESTRICTIONS.DESCRIPTION_MAX_LENGTH, { message: UPDATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: UPDATE_OFFER_VALIDATION_MESSAGE.POST_DATE.INVALID_FORMAT })
  public postDate?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => OfferCityDto)
  public city?: OfferCityDto;

  @IsOptional()
  @IsString({ message: UPDATE_OFFER_VALIDATION_MESSAGE.PREVIEW_IMAGE.INVALID_FORMAT })
  @MaxLength(CREATE_OFFER_RESTRICTIONS.PREVIEW_IMAGE_MAX_LENGTH, { message: UPDATE_OFFER_VALIDATION_MESSAGE.PREVIEW_IMAGE.MAX_LENGTH })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: UPDATE_OFFER_VALIDATION_MESSAGE.PHOTOS.INVALID_FORMAT })
  public photos?: string[];

  @IsOptional()
  @IsBoolean({ message:  UPDATE_OFFER_VALIDATION_MESSAGE.IS_PREMIUM.INVALID_FORMAT })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferType, { message:  UPDATE_OFFER_VALIDATION_MESSAGE.TYPE.INVALID })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message:  UPDATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.INVALID_FORMAT })
  @Min(CREATE_OFFER_RESTRICTIONS.BEDROOMS_MIN_VALUE, { message:  UPDATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.MIN_VALUE })
  @Max(CREATE_OFFER_RESTRICTIONS.BEDROOMS_MAX_VALUE, { message:  UPDATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.MAX_VALUE })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message:  UPDATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.INVALID_FORMAT })
  @Min(CREATE_OFFER_RESTRICTIONS.MAX_ADULTS_MIN_VALUE, { message:  UPDATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MIN_VALUE })
  @Max(CREATE_OFFER_RESTRICTIONS.MAX_ADULTS_MAX_VALUE, { message:  UPDATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MAX_VALUE })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message:  UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.INVALID_FORMAT })
  @Min(CREATE_OFFER_RESTRICTIONS.PRICE_MIN_VALUE, { message:  UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.MIN_VALUE })
  @Max(CREATE_OFFER_RESTRICTIONS.PRICE_MAX_VALUE, { message:  UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.MAX_VALUE })
  public price?: number;

  @IsOptional()
  @IsArray({ message:  UPDATE_OFFER_VALIDATION_MESSAGE.GOODS.INVALID_FORMAT })
  @IsEnum(Goods, { each: true, message:  UPDATE_OFFER_VALIDATION_MESSAGE.GOODS.INVALID })
  public goods?: Goods;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  public location?: LocationDto;
}
