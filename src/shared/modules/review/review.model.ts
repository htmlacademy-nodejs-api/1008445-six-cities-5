import { Schema, Document, model } from 'mongoose';
import { TReview } from '../../types/index.js';
export interface IReviewDocument extends TReview, Document {
  createdAt: Date,
  updatedAt: Date,
}

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
    minLength: [ 5, 'Min length for comment is 5' ],
    maxLength: [ 1024, 'Max length for comment is 1024']
  },
  rating: {
    type: Number,
    required: true,
    minLength: [ 1, 'Min length for rating is 1' ],
    maxLength: [ 5, 'Max length for rating is 5']
  },
  userId: {
    type: String,
    required: true,
  },
  offerId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const ReviewModel = model<IReviewDocument>('Review', reviewSchema);
