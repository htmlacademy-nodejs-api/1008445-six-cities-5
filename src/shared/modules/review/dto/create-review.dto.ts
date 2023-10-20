import { CreateReviewValidationMessage } from './create-review.messages.js';
import { IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateReviewDto {
  @IsMongoId({ message: CreateReviewValidationMessage.userId.invalidId })
  public userId: string;

  @IsMongoId({ message: CreateReviewValidationMessage.offerId.invalidId })
  public offerId: string;

  @MinLength(5, { message: CreateReviewValidationMessage.comment.minLength })
  @MaxLength(1024, { message: CreateReviewValidationMessage.comment.maxLength })
  public comment: string;

  @IsInt({ message: CreateReviewValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateReviewValidationMessage.rating.minValue })
  @Max(5, { message: CreateReviewValidationMessage.rating.maxValue })
  public rating: number;
}
