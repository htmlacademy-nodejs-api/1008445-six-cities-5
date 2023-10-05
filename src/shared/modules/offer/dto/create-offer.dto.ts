import { OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  title: string;
  description: string;
  city: string;
  previewImage: string;
  photo: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  userId: string;
  location: string[];
}
