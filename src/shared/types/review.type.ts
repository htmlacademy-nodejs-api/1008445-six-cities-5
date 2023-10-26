import { TUser } from './user.type.js';

export type TReview = {
  postDate: Date;
  user: TUser;
  comment: string;
  rating: number;
}
