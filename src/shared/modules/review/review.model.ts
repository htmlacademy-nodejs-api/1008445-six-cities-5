import { Schema, Document, model } from 'mongoose';
import { TReview } from '../../types/index.js';
export interface IReviewDocument extends TReview, Document {
  createdAt: Date,
  updatedAt: Date,
}

const reviewSchema = new Schema({
  COMMENT: {
    TYPE: String,
    required: true,
    MIN_LENGTH: [ 5, 'Min length for comment is 5' ],
    MAX_LENGTH: [ 1024, 'Max length for comment is 1024']
  },
  RATING: {
    TYPE: Number,
    required: true,
    MIN_LENGTH: [ 1, 'Min length for rating is 1' ],
    MAX_LENGTH: [ 5, 'Max length for rating is 5']
  },
  USER_ID: {
    TYPE: String,
    required: true,
  },
  OFFER_ID: {
    TYPE: String,
    required: true,
  },
}, { timestamps: true });

export const ReviewModel = model<IReviewDocument>('Review', reviewSchema);
