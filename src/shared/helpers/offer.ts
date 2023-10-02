import { TOffer, OfferType, TLocation, TUser } from '../types/index.js';
import { TCity } from '../types/city.type.js';

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
  const [ lat, lng ] = offerLocation.split(';');
  const location: TLocation = {
    latitude: +lat,
    longitude: +lng
  };

  const city: TCity = {
    name: cityName,
    location: location
  };

  return {
    title,
    description,
    createdDate: new Date(createdDate),
    city,
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
    location
  };
}
