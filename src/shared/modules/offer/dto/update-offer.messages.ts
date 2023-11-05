export const UPDATE_OFFER_VALIDATION_MESSAGE = {
  TITLE: {
    MIN_LENGTH: 'Minimum title length must be 10',
    MAX_LENGTH: 'Maximum title length must be 100',
  },
  DESCRIPTION: {
    MIN_LENGTH: 'Minimum description length must be 20',
    MAX_LENGTH: 'Maximum description length must be 1024',
  },
  POST_DATE: {
    INVALID_FORMAT: 'postDate must be a valid ISO date',
  },
  PREVIEW_IMAGE: {
    MAX_LENGTH: 'Too short for field «preview image»',
    INVALID_FORMAT: 'preview image is required',
  },
  BEDROOMS: {
    INVALID_FORMAT: 'Price must be an integer',
    MIN_VALUE: 'Minimum title length must be 1',
    MAX_VALUE: 'Maximum title length must be 8',
  },
  MAX_ADULTS: {
    INVALID_FORMAT: 'Price must be an integer',
    MIN_VALUE: 'Minimum title length must be 1',
    MAX_VALUE: 'Maximum title length must be 10',
  },
  CITY: {
    INVALID: 'type must be Paris, Cologne, Brussels, Amsterdam, Hamburg or Dusseldorf',
  },
  TYPE: {
    INVALID: 'type must be Apartment, House, Room or Hotel',
  },
  PRICE: {
    INVALID_FORMAT: 'Price must be an integer',
    MIN_VALUE: 'Minimum price is 100',
    MAX_VALUE: 'Maximum price is 100000',
  },
  GOODS: {
    INVALID_FORMAT: 'Field goods must be an array',
    INVALID: 'goods must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels or Fridge',
  },
  IS_PREMIUM: {
    INVALID_FORMAT: 'Premium value must be a boolean',
  },
  PHOTOS: {
    INVALID_FORMAT: 'Field photos must be an array',
    MAX_LENGTH: 'Too short for field «photo»',
  },
} as const;
