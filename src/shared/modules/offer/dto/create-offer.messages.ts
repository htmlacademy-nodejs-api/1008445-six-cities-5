export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  image: {
    maxLength: 'Too short for field «image»',
  },
  bedrooms: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum title length must be 1',
    maxValue: 'Maximum title length must be 8',
  },
  maxAdults: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum title length must be 1',
    maxValue: 'Maximum title length must be 10',
  },
  city: {
    invalid: 'type must be Paris, Cologne, Brussels, Amsterdam, Hamburg or Dusseldorf',
  },
  type: {
    invalid: 'type must be Apartment, House, Room or Hotel',
  },
  goods: {
    invalidFormat: 'Field goods must be an array',
    invalid: 'goods must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels or Fridge',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  isPremium: {
    invalidFormat: 'Premium value must be a boolean',
  },
  photos: {
    invalidFormat: 'Field photos must be an array',
    maxLength: 'Too short for field «image»',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  location: {
    invalidFormat: 'Latitude or longitude must be a coordinate',
  },
} as const;
