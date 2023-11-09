import { CREATE_OFFER_RESTRICTIONS } from './create-offer.dto.constant.js';

export const CREATE_OFFER_VALIDATION_MESSAGE = {
  TITLE: {
    MIN_LENGTH: `Minimum title length must be ${ CREATE_OFFER_RESTRICTIONS.TITLE_MIN_LENGTH }`,
    MAX_LENGTH: `Maximum title length must be ${ CREATE_OFFER_RESTRICTIONS.TITLE_MAX_LENGTH }`,
  },
  DESCRIPTION: {
    MIN_LENGTH: `Minimum description length must be ${ CREATE_OFFER_RESTRICTIONS.DESCRIPTION_MIN_LENGTH }`,
    MAX_LENGTH: `Maximum description length must be ${ CREATE_OFFER_RESTRICTIONS.DESCRIPTION_MAX_LENGTH }`,
  },
  POST_DATE: {
    INVALID_FORMAT: 'postDate must be a valid ISO date',
  },
  PREVIEW_IMAGE: {
    MAX_LENGTH: 'Too long for field «preview image»',
  },
  BEDROOMS: {
    INVALID_FORMAT: 'Price must be an integer',
    MIN_VALUE: `Minimum bedrooms must be ${ CREATE_OFFER_RESTRICTIONS.BEDROOMS_MIN_VALUE }`,
    MAX_VALUE: `Maximum bedrooms must be ${ CREATE_OFFER_RESTRICTIONS.BEDROOMS_MAX_VALUE }`,
  },
  MAX_ADULTS: {
    INVALID_FORMAT: 'Price must be an integer',
    MIN_VALUE: `Minimum adults must be ${ CREATE_OFFER_RESTRICTIONS.MAX_ADULTS_MIN_VALUE }`,
    MAX_VALUE: `Maximum adults must be ${ CREATE_OFFER_RESTRICTIONS.MAX_ADULTS_MAX_VALUE }`,
  },
  CITY: {
    INVALID: 'type must be Paris, Cologne, Brussels, Amsterdam, Hamburg or Dusseldorf',
  },
  TYPE: {
    INVALID: 'type must be Apartment, House, Room or Hotel',
  },
  GOODS: {
    INVALID_FORMAT: 'Field goods must be an array',
    INVALID: 'goods must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels or Fridge',
  },
  PRICE: {
    INVALID_FORMAT: 'Price must be an integer',
    MIN_VALUE: `Minimum price is ${ CREATE_OFFER_RESTRICTIONS.PRICE_MIN_VALUE }`,
    MAX_VALUE: `Maximum price is ${ CREATE_OFFER_RESTRICTIONS.PRICE_MAX_VALUE }`,
  },
  IS_PREMIUM: {
    INVALID_FORMAT: 'Premium value must be a boolean',
  },
  PHOTOS: {
    INVALID_FORMAT: 'Field photos must be an array',
    MAX_LENGTH: 'Too short for field «photo»',
  },
  LOCATION: {
    INVALID_FORMAT: 'Latitude or longitude must be a coordinate',
  },
} as const;
