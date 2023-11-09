import { CREATE_REVIEW_RESTRICTIONS } from './create-review.dto.constant.js';

export const CREATE_REVIEW_VALIDATION_MESSAGE = {
  COMMENT: {
    MIN_LENGTH: `Minimum text length must be ${ CREATE_REVIEW_RESTRICTIONS.COMMENT_MIN_LENGTH }`,
    MAX_LENGTH: `Maximum text length must be ${ CREATE_REVIEW_RESTRICTIONS.COMMENT_MAX_LENGTH }`,
  },
  RATING: {
    INVALID_FORMAT: 'Price must be an integer',
    MIN_VALUE: `Minimum rating must be ${ CREATE_REVIEW_RESTRICTIONS.RATING_MIN_VALUE }`,
    MAX_VALUE: `Maximum rating must be ${ CREATE_REVIEW_RESTRICTIONS.RATING_MAX_VALUE }`,
  },
} as const;
