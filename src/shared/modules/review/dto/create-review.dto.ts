import { IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CREATE_REVIEW_VALIDATION_MESSAGE } from './create-review.messages.js';
export class CreateReviewDto {
  @IsMongoId({ message: CREATE_REVIEW_VALIDATION_MESSAGE.USER_ID.INVALID_ID })
  public userId: string;

  @IsMongoId({ message: CREATE_REVIEW_VALIDATION_MESSAGE.OFFER_ID.INVALID_ID })
  public offerId: string;

  @MinLength(5, { message: CREATE_REVIEW_VALIDATION_MESSAGE.COMMENT.MIN_LENGTH })
  @MaxLength(1024, { message: CREATE_REVIEW_VALIDATION_MESSAGE.COMMENT.MAX_LENGTH })
  public comment: string;

  @IsInt({ message: CREATE_REVIEW_VALIDATION_MESSAGE.RATING.INVALID_FORMAT })
  @Min(1, { message: CREATE_REVIEW_VALIDATION_MESSAGE.RATING.MIN_VALUE })
  @Max(5, { message: CREATE_REVIEW_VALIDATION_MESSAGE.RATING.MAX_VALUE })
  public rating: number;
}
