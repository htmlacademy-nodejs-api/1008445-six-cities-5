import { TUser } from './user.type.js';
import { OfferType } from './offer-type.enum.js';
import { City } from './city.enum.js';
import { TLocation } from './location.type.js';

export type TOffer = {
  title: string;
  description: string;
  city: City;
  previewImage: string;
  date: Date;
  photo: string[];
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  user: TUser;
  location: TLocation;
}
