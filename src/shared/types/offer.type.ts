import { TUser } from './user.type.js';
import { OfferType } from './offer-type.enum.js';
import { TLocation } from './location.type.js';
import { Goods } from './goods.enum.js';
import { TCity } from './city.type.js';

export type TOffer = {
  title: string;
  description: string;
  city: TCity;
  previewImage: string;
  postDate: Date;
  photos: string[];
  isPremium: boolean;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Goods[];
  user: TUser;
  location: TLocation;
}
