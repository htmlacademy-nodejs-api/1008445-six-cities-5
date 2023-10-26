export const CreateReviewValidationMessage = {
  comment: {
    minLength: 'Minimum title length must be 5',
    maxLength: 'Maximum title length must be 1024',
  },
  rating: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum title length must be 1',
    maxValue: 'Maximum title length must be 5',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  offerId: {
    invalidId: 'offerId field must be a valid id',
  },
} as const;
