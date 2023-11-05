import ReviewDto from '../../dto/review/review.dto';
import OfferDto from '../../dto/offer/offer.dto';
import { Offer, Comment, PreviewOffer } from '../../types/types';

export const adaptPreviewOffersToClient = (offers: OfferDto[]): PreviewOffer[] => (
  offers.map((offer: OfferDto) => ({
    id: offer.id,
    price: offer.price,
    title: offer.title,
    rating: offer.rating,
    isPremium: offer.isPremium,
    isFavorite: offer.isFavorite,
    city: offer.city,
    location: offer.location,
    description: offer.description,
    previewImage: offer.previewImage,
    type: offer.type,
    images: offer.photos,
  }))
);

export const adaptOfferToClient = (offer: OfferDto): Offer => ({
  id: offer.id,
  price: offer.price,
  title: offer.title,
  rating: offer.rating,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  city: offer.city,
  location: offer.location,
  description: offer.description,
  previewImage: offer.previewImage,
  type: offer.type,
  bedrooms: offer.bedrooms,
  goods: offer.goods,
  host: offer.user,
  images: offer.photos,
  maxAdults: offer.maxAdults
});

export const adaptCommentsToClient =
  (comments: ReviewDto[]): Comment[] =>
    comments
      .filter((comment: ReviewDto) => comment.user !== null)
      .map((review: ReviewDto) => adaptCommentToClient(review));

export const adaptCommentToClient =
  (review: ReviewDto): Comment => ({
    id: review.id,
    comment: review.comment,
    rating: review.rating,
    date: review.postDate,
    user: review.user,
  });
