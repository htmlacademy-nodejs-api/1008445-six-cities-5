// import { TCity } from './city.type.js';
// import { TUser } from './user.type.js';
// import { TLocation } from './location.type.js';

import { TUser } from './user.type.js';
import { OfferType } from './offer-type.enum.js';

export type TOffer = {
  title: string;
  description: string;
  city: string;
  previewImage: string;
  createdDate: Date;
  photo: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  user: TUser;
  location: string[];
}
