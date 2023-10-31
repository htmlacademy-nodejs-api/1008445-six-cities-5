export const CREATE_REVIEW_VALIDATION_MESSAGE = {
  COMMENT: {
    MIN_LENGTH: 'Minimum title length must be 5',
    MAX_LENGTH: 'Maximum title length must be 1024',
  },
  RATING: {
    INVALID_FORMAT: 'Price must be an integer',
    MIN_VALUE: 'Minimum title length must be 1',
    MAX_VALUE: 'Maximum title length must be 5',
  },
  USER_ID: {
    INVALID_ID: 'userId field must be a valid id',
  },
  OFFER_ID: {
    INVALID_ID: 'offerId field must be a valid id',
  },
} as const;
