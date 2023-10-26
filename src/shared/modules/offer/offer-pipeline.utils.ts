import { PipelineStage, Types } from 'mongoose';
import { SortType } from '../../types/index.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';

const getMatchOfferId = (offerId: string) => (
  { $match: { _id: new Types.ObjectId(offerId) } }
);
const lookupReviews = ({
  $lookup: {
    from: 'reviews',
    localField: '_id',
    foreignField: 'offerId',
    as: 'reviews',
  },
});
const lookupOfferUser = ({
  $lookup: {
    from: 'users',
    localField: 'userId',
    foreignField: '_id',
    as: 'user',
  },
});
const getLookupCurrentUser = (authUserId = '') => ({
  $lookup: {
    from: 'users',
    pipeline: [
      { $match: { _id: new Types.ObjectId(authUserId) } }
    ],
    as: 'currentUser'
  }
});
const addRatingAndReviewCountFields = ({
  $addFields: {
    rating: {
      $divide: [
        {
          $reduce: {
            input: '$reviews',
            initialValue: 0,
            in: { $add: ['$$value', '$$this.rating'] },
          },
        },
        {
          $cond: {
            if: { $ne: [ { $size: '$reviews' }, 0 ] },
            then: { $size: '$reviews' },
            else: 1,
          },
        },
      ],
    },
    reviewsCount: { $size: '$reviews' },
  },
});
const addFavoriteField = ({
  $addFields: {
    favorites: '$currentUser.favoriteOffers'
  },
});
const unwindFavoriteField = ({ $unwind: '$favorites' });
const unsetReviews = ({ $unset: 'reviews' });
const project = ({
  $project: {
    id: { $toString: '$_id' },
    rating: { $round: [ '$rating', 1 ] },
    title: 1,
    bedrooms: 1,
    city: 1,
    description: 1,
    goods: 1,
    isPremium: 1,
    location: 1,
    maxAdults: 1,
    photos: 1,
    postDate: 1,
    previewImage: 1,
    price: 1,
    reviewsCount: 1,
    type: 1,
    userId: { $arrayElemAt: [ '$user', 0 ] },
    isFavorite: {
      $cond: {
        if: '$favorites',
        then: { $in: [ { $toString: '$_id' }, '$favorites'] },
        else: false,
      },
    },
  }
});
const getLimitRestriction = (offersLimit: number) => ({ $limit: offersLimit });
const sort = ({ $sort: { createdAt: SortType.Down } });
export const getFullOfferPipeline = (offerId: string, currentUserId?: string) :PipelineStage[] =>
  currentUserId
    ? [
      getMatchOfferId(offerId),
      lookupReviews,
      lookupOfferUser,
      getLookupCurrentUser(currentUserId),
      addRatingAndReviewCountFields,
      addFavoriteField,
      unwindFavoriteField,
      unsetReviews,
      project
    ]
    : [
      getMatchOfferId(offerId),
      lookupReviews,
      lookupOfferUser,
      addRatingAndReviewCountFields,
      addFavoriteField,
      unsetReviews,
      project
    ];
export const getOfferPipeline = (currentUserId?: string, limit?: string) :PipelineStage[] => {
  const offersLimit = limit ? parseInt(limit, 10) : DEFAULT_OFFER_COUNT;
  return currentUserId
    ? [
      lookupReviews,
      lookupOfferUser,
      getLookupCurrentUser(currentUserId),
      addRatingAndReviewCountFields,
      addFavoriteField,
      unwindFavoriteField,
      unsetReviews,
      getLimitRestriction(offersLimit),
      sort,
      project
    ]
    : [
      lookupReviews,
      lookupOfferUser,
      addRatingAndReviewCountFields,
      addFavoriteField,
      unsetReviews,
      getLimitRestriction(offersLimit),
      sort,
      project
    ];
};
