import { SortType } from '../../types/index.js';
import { OFFER_OPTIONS } from './offer.constant.js';

export const getLimitPipeline = (limit: string | undefined) => ({
  $limit: limit ? parseInt(limit, 10) : OFFER_OPTIONS.DEFAULT_OFFER_COUNT
});

export const sortPipeline = ({ $sort: { postDate: SortType.Down } });

export const commentsPipeline = [
  {
    $lookup: {
      from: 'reviews',
      let: { offerId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: [ '$$offerId', '$offerId' ] } } },
        { $project: { _id: 0, rating: 1 } },
      ],
      as: 'reviews',
    },
  },
];

export const authorPipeline = [
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'users',
    },
  },
  {
    $addFields: {
      author: { $arrayElemAt: ['$users', 0] },
    },
  },
  {
    $unset: ['users'],
  },
];

export const getUserPipeline = (userId: string) => [
  {
    $lookup: {
      from: 'users',
      let: { userId: { $toObjectId: userId } },
      pipeline: [
        { $match: { $expr: { $eq: [ '$_id', '$$userId' ] } } },
        { $project: { _id: 0, favoriteOffers: 1 } },
      ],
      as: 'users',
    },
  },
  {
    $addFields: {
      user: { $arrayElemAt: [ '$users', 0 ] },
    },
  },
  {
    $unset: [ 'users' ],
  },
];

export const projectPipeline = [
  {
    $project: {
      id: { $toString: '$_id' },
      rating: { $ifNull: [ { $avg: '$reviews.rating' }, 0 ] },
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
      reviewsCount: { $size: '$reviews' },
      type: 1,
      author: 1,
      isFavorite: { $in: [{ $toString: '$_id' }, { $ifNull: ['$user.favoriteOffers', []] }] },
    },
  },
];

export const getOfferPipeline = (userId?: string) => {
  const userPipeline = userId ? getUserPipeline(userId) : [];

  return [
    ...commentsPipeline,
    ...authorPipeline,
    ...userPipeline,
    ...projectPipeline,
  ];
};
