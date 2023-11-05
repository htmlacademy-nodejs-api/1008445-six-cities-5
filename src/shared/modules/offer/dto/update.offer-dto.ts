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

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: UPDATE_OFFER_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(100, { message: UPDATE_OFFER_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: UPDATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(1024, { message: UPDATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
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
  @MaxLength(256, { message: UPDATE_OFFER_VALIDATION_MESSAGE.PREVIEW_IMAGE.MAX_LENGTH })
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
  @IsInt({ message:  UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.INVALID_FORMAT })
  @Min(1, { message:  UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.MIN_VALUE })
  @Max(8, { message:  UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.MAX_VALUE })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message:  UPDATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.INVALID_FORMAT })
  @Min(1, { message:  UPDATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MIN_VALUE })
  @Max(10, { message:  UPDATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MAX_VALUE })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message:  UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.INVALID_FORMAT })
  @Min(100, { message:  UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.MIN_VALUE })
  @Max(100000, { message:  UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.MAX_VALUE })
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
