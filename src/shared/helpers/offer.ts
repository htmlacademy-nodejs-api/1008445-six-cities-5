import { TOffer, OfferType, TUser } from '../types/index.js';
import { City } from '../types/city.enum.js';
import { Goods } from '../types/goods.enum.js';
import { CITIES } from '../../const.js';
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
    userType
  ] = offerData.replace('\n', '').split('\t');

  const user: TUser = {
    email,
    name: userName,
    avatarUrl,
    type: userType
  };

  const [ latitude , longitude] = offerLocation
    .split(';')
    .map((value) => parseFloat(value));

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: CITIES[ city as City ],
    previewImage,
    photos: photos.split(';'),
    isPremium: isPremium === 'true',
    type: type as OfferType,
    bedrooms: parseInt(bedrooms, 10),
    maxAdults: parseInt(maxAdults, 10),
    price: parseInt(price, 10),
    goods: goods.split(';') as Goods[],
    user,
    location: { latitude, longitude },
  };
}
