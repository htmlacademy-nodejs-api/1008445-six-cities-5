import { TOffer, OfferType, TUser } from '../types/index.js';
import { City } from '../types/city.enum.js';
import { Goods } from '../types/goods.enum.js';

export function createOffer(offerData: string): TOffer {
  const [
    title,
    description,
    previewImage,
    date,
    photos,
    type,
    price,
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

  const [ latitude , longitude] = offerLocation
    .split(';')
    .map((value) => +value);

  return {
    title,
    description,
    date: new Date(date),
    city: City[ city as keyof typeof City ],
    previewImage,
    photos: photos.split(';'),
    isPremium: Boolean(isPremium),
    rating: +rating,
    type: type as OfferType,
    bedrooms: +bedrooms,
    maxAdults: +maxAdults,
    price: +price,
    goods: goods.split(';') as Goods[],
    user,
    location: { latitude, longitude },
  };
}
