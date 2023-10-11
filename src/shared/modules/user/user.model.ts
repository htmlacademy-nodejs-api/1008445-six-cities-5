import { Schema, Document, model } from 'mongoose';
import { TUser } from '../../types/index.js';
export interface IUserDocument extends TUser, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [ 5, 'Min length for name is 5' ]
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|.(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email is incorrect' ],
    required: true
  },
  avatarUrl: {
    type: String,
    required: true,
    minLength: [ 5, 'Min length for avatar url is 5' ]
  },
  password: {
    type: String,
    required: true,
    match: [ /^(?=.*[a-z])(?=.*[0-9]).{2,64}$/, 'Password is incorrect']
  },
  isPro: {
    type: Boolean,
    required: true
  },
}, { timestamps: true });

export const UserModel = model<IUserDocument>('User', userSchema);
