import { TCity } from './city.type.js';
import { TUser } from './user.type.js';
import { TLocation } from './location.type.js';

export type TOffer = {
  title: string;
  description: string;
  createdDate: Date;
  city: TCity;
  previewImage: string;
  photo: string[];
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  user: TUser;
  location: TLocation;
}
