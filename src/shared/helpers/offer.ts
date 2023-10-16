import { TOffer, OfferType, TUser } from '../types/index.js';
import { City } from '../types/city.enum.js';

export function createOffer(offerData: string): TOffer {
  const [
    title,
    description,
    previewImage,
    date,
    photo,
    type,
    price,
    isFavorite,
    isPremium,
    rating,
    city,
    bedrooms,
    maxAdults,
    offerLocation,
    avatarUrl,
    goods,
    userName,
    email,
  ] = offerData.replace('\n', '').split('\t');

  const user: TUser = {
    email,
    name: userName,
    avatarUrl,
    isPro: Boolean(isPremium)
  };

  return {
    title,
    description,
    date: new Date(date),
    city: City[ city as keyof typeof City ],
    previewImage,
    photo: photo.split(';'),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: +rating,
    type: OfferType[ type as keyof typeof OfferType ],
    bedrooms: +bedrooms,
    maxAdults: +maxAdults,
    price: +price,
    goods: goods.split(';'),
    user,
    location: offerLocation.split(';'),
  };
}
