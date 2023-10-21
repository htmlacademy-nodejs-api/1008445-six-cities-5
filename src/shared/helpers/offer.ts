import { TOffer, OfferType, TUser } from '../types/index.js';
import { City } from '../types/city.enum.js';
import { Goods } from '../types/goods.enum.js';
import { Cities } from '../../const.js';

export function createOffer(offerData: string): TOffer {
  const [
    title,
    description,
    previewImage,
    postDate,
    photos,
    type,
    price,
    isPremium,
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
    .map((value) => parseInt(value, 10));

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: Cities[ city as City ],
    previewImage,
    photos: photos.split(';'),
    isPremium: Boolean(isPremium),
    type: type as OfferType,
    bedrooms: parseInt(bedrooms, 10),
    maxAdults: parseInt(maxAdults, 10),
    price: parseInt(price, 10),
    goods: goods.split(';') as Goods[],
    user,
    location: { latitude, longitude },
  };
}
