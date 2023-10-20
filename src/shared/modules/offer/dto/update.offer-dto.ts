import { OfferType } from '../../../types/index.js';
import { City } from '../../../types/city.enum.js';
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
import { UpdateOfferValidationMessage } from './update-offer.messages.js';
import { Goods } from '../../../types/goods.enum.js';
import { Type } from 'class-transformer';
import { LocationDto } from './offer-location.dto.js';

export class UpdateOfferDto {
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @MinLength(20, { message: UpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsDateString({}, { message: UpdateOfferValidationMessage.date.invalidFormat })
  public date?: Date;

  @IsEnum(City, { message: UpdateOfferValidationMessage.city.invalid })
  public city?: City;

  @MaxLength(256, { message: UpdateOfferValidationMessage.image.maxLength })
  public previewImage?: string;

  @IsArray({ message: UpdateOfferValidationMessage.photos.invalidFormat })
  public photos: string[];

  @IsBoolean({ message:  UpdateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsInt({ message:  UpdateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message:  UpdateOfferValidationMessage.rating.minValue })
  @Max(5, { message:  UpdateOfferValidationMessage.rating.maxValue })
  public rating?: number;

  @IsEnum(OfferType, { message:  UpdateOfferValidationMessage.type.invalid })
  public type?: OfferType;

  @IsInt({ message:  UpdateOfferValidationMessage.price.invalidFormat })
  @Min(1, { message:  UpdateOfferValidationMessage.price.minValue })
  @Max(8, { message:  UpdateOfferValidationMessage.price.maxValue })
  public bedrooms?: number;

  @IsInt({ message:  UpdateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message:  UpdateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message:  UpdateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults?: number;

  @IsInt({ message:  UpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message:  UpdateOfferValidationMessage.price.minValue })
  @Max(100000, { message:  UpdateOfferValidationMessage.price.maxValue })
  public price?: number;

  @IsArray({ message:  UpdateOfferValidationMessage.goods.invalidFormat })
  @IsEnum(Goods, { each: true, message:  UpdateOfferValidationMessage.goods.invalid })
  public goods?: Goods;

  @ValidateNested()
  @Type(() => LocationDto)
  public location?: LocationDto;
}
