import { TUser } from './user.type.js';

export type TReview = {
  date: string;
  user: TUser;
  comment: string;
  rating: number;
}
