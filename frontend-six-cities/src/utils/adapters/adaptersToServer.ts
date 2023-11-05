import { NewOrEditOffer } from '../../types/types';
import { adaptOfferType } from '../utils';
import CreateOrUpdateOfferDto from '../../dto/offer/update-offer.dto';

export const adaptCreateOfferToServer =
  (offer: NewOrEditOffer): CreateOrUpdateOfferDto => ({
    price: offer.price,
    title: offer.title,
    isPremium: offer.isPremium,
    city: offer.city,
    location: offer.location,
    description: offer.description,
    previewImage: offer.previewImage ? offer.previewImage.name : undefined,
    type: adaptOfferType(offer.type),
    bedrooms: offer.bedrooms,
    goods: offer.goods,
    photos: offer.images.map(({ name }) => name),
    maxAdults: offer.maxAdults,
    postDate: new Date()
  });

export const adaptEditOfferToServer =
  (offer: NewOrEditOffer): CreateOrUpdateOfferDto => ({
    id: offer.id,
    price: offer.price,
    title: offer.title,
    isPremium: offer.isPremium,
    city: offer.city,
    location: offer.location,
    description: offer.description,
    previewImage: offer.previewImage ? offer.previewImage.name : undefined,
    type: adaptOfferType(offer.type),
    bedrooms: offer.bedrooms,
    goods: offer.goods,
    photos: offer.images.map(({ name }) => name),
    maxAdults: offer.maxAdults,
    postDate: new Date()
  });

export const adaptPreviewImageToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('previewImage', file);

    return formData;
  };
