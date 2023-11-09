import { IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CREATE_REVIEW_VALIDATION_MESSAGE } from './create-review.messages.js';
import { CREATE_REVIEW_RESTRICTIONS } from './create-review.dto.constant.js';
export class CreateReviewDto {
  public userId: string;

  public offerId: string;

  @MinLength(CREATE_REVIEW_RESTRICTIONS.COMMENT_MIN_LENGTH, { message: CREATE_REVIEW_VALIDATION_MESSAGE.COMMENT.MIN_LENGTH })
  @MaxLength(CREATE_REVIEW_RESTRICTIONS.COMMENT_MAX_LENGTH, { message: CREATE_REVIEW_VALIDATION_MESSAGE.COMMENT.MAX_LENGTH })
  public comment: string;

  @IsInt({ message: CREATE_REVIEW_VALIDATION_MESSAGE.RATING.INVALID_FORMAT })
  @Min(CREATE_REVIEW_RESTRICTIONS.RATING_MIN_VALUE, { message: CREATE_REVIEW_VALIDATION_MESSAGE.RATING.MIN_VALUE })
  @Max(CREATE_REVIEW_RESTRICTIONS.RATING_MAX_VALUE, { message: CREATE_REVIEW_VALIDATION_MESSAGE.RATING.MAX_VALUE })
  public rating: number;
}
