import { TOffer, OfferType, TUser } from '../types/index.js';

export function createOffer(offerData: string): TOffer {
  const [
    title,
    description,
    previewImage,
    createdDate,
    password,
    photo,
    type,
    price,
    isFavorite,
    isPremium,
    rating,
    cityName,
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
    password,
    isPro: Boolean(isPremium)
  };

  return {
    title,
    description,
    createdDate: new Date(createdDate),
    city: cityName,
    previewImage,
    photo,
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: +rating,
    type: OfferType[ type as keyof typeof OfferType ],
    bedrooms: +bedrooms,
    maxAdults: +maxAdults,
    price: +price,
    goods: goods.split(';'),
    user,
    location: offerLocation.split(';')
  };
}
