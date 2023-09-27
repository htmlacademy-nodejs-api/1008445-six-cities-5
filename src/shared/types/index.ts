export type TUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type TCity = {
  name: string;
  location: TLocation;
}

export type TOffer = {
  title: string;
  description: string;
  date: Date;
  city: string; //TCity
  previewImage: string;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: string; //TUser
  location: string[]; //TLocation
  comments: number;
}

export type TReview = {
  id: string;
  date: string;
  user: TUser;
  comment: string;
  rating: number;
}
