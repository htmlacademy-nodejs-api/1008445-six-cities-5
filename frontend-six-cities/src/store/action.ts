import type { History } from 'history';
import type { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  UserAuth,
  User,
  Offer,
  Comment,
  CommentAuth,
  FavoriteAuth,
  UserRegister,
  NewOrEditOffer, PreviewOffer,
} from '../types/types';
import { ApiRoute, AppRoute, HttpCode } from '../const';
import { Token } from '../utils';
import OfferDto from '../dto/offer/offer.dto';
import {
  adaptCommentsToClient, adaptCommentToClient,
  adaptOfferToClient,
  adaptPreviewOffersToClient
} from '../utils/adapters/adaptersToClient';
import ReviewDto from '../dto/review/review.dto';
import {
  adaptCreateOfferToServer,
  adaptEditOfferToServer,
} from '../utils/adapters/adaptersToServer';

type Extra = {
  api: AxiosInstance;
  history: History;
};

export const Action = {
  FETCH_OFFERS: 'offers/fetch',
  FETCH_OFFER: 'offer/fetch',
  POST_OFFER: 'offer/post-offer',
  EDIT_OFFER: 'offer/edit-offer',
  DELETE_OFFER: 'offer/delete-offer',
  FETCH_FAVORITE_OFFERS: 'offers/fetch-favorite',
  FETCH_PREMIUM_OFFERS: 'offers/fetch-premium',
  FETCH_COMMENTS: 'offer/fetch-comments',
  POST_COMMENT: 'offer/post-comment',
  POST_FAVORITE: 'offer/post-favorite',
  DELETE_FAVORITE: 'offer/delete-favorite',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  REGISTER_USER: 'user/register',
};
export const OFFER_STATUSES = {
  FAVORITE: 1,
  NOT_FAVORITE: 0
};

export const fetchOffers = createAsyncThunk<PreviewOffer[], undefined, { extra: Extra }>(
  Action.FETCH_OFFERS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferDto[]>(ApiRoute.Offers);
    return adaptPreviewOffersToClient(data);
  });

export const fetchFavoriteOffers = createAsyncThunk<PreviewOffer[], undefined, { extra: Extra }>(
  Action.FETCH_FAVORITE_OFFERS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferDto[]>(ApiRoute.Favorite);

    return adaptPreviewOffersToClient(data);
  });

export const fetchOffer = createAsyncThunk<Offer, Offer['id'], { extra: Extra }>(
  Action.FETCH_OFFER,
  async (id, { extra }) => {
    const { api, history } = extra;

    try {
      const { data } = await api.get<OfferDto>(`${ApiRoute.Offers}/${id}`);

      return adaptOfferToClient(data);
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NotFound) {
        history.push(AppRoute.NotFound);
      }

      return Promise.reject(error);
    }
  });

export const postOffer = createAsyncThunk<Offer, NewOrEditOffer, { extra: Extra }>(
  Action.POST_OFFER,
  async (newOffer, { extra }) => {
    const { api, history } = extra;
    const { data, status } = await api.post<OfferDto>(ApiRoute.Offers, adaptCreateOfferToServer(newOffer));
    await postImages(api, status, data.id, newOffer);

    history.push(`${AppRoute.Property}/${data.id}`);

    return adaptOfferToClient(data);
  });

export const editOffer = createAsyncThunk<Offer, NewOrEditOffer, { extra: Extra }>(
  Action.EDIT_OFFER,
  async (offer, { extra }) => {
    const { api, history } = extra;
    const { data, status } = await api.patch<OfferDto>(`${ApiRoute.Offers}/${offer.id}`, adaptEditOfferToServer(offer));
    await postImages(api, status, data.id, offer);

    history.push(`${AppRoute.Property}/${data.id}`);

    return adaptOfferToClient(data);
  });

export const deleteOffer = createAsyncThunk<void, string, { extra: Extra }>(
  Action.DELETE_OFFER,
  async (id, { extra }) => {
    const { api, history } = extra;
    await api.delete(`${ApiRoute.Offers}/${id}`);
    history.push(AppRoute.Root);
  });

export const fetchPremiumOffers = createAsyncThunk<PreviewOffer[], string, { extra: Extra }>(
  Action.FETCH_PREMIUM_OFFERS,
  async (cityName, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferDto[]>(`${ApiRoute.Offers}/${ApiRoute.Premium}/${cityName}`);

    return adaptPreviewOffersToClient(data);
  });

export const fetchComments = createAsyncThunk<Comment[], Offer['id'], { extra: Extra }>(
  Action.FETCH_COMMENTS,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<ReviewDto[]>(`${ApiRoute.Comments}/${id}`);

    return adaptCommentsToClient(data);
  });

export const fetchUserStatus = createAsyncThunk<UserAuth['email'], undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra }) => {
    const { api } = extra;

    try {
      const { data } = await api.get<User>(ApiRoute.Login);

      return data.email;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NoAuth) {
        Token.drop();
      }

      return Promise.reject(error);
    }
  });

export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<User & { token: string }>(ApiRoute.Login, { email, password });
    const { token } = data;

    Token.save(token);
    history.push(AppRoute.Root);

    return email;
  });

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async (_, { extra }) => {
    const { api } = extra;
    await api.delete(ApiRoute.Logout);

    Token.drop();
  });

export const registerUser = createAsyncThunk<void, UserRegister, { extra: Extra }>(
  Action.REGISTER_USER,
  async ({ email, password, name, avatar, type }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<{ id: string }>(ApiRoute.Register, {
      email,
      password,
      name,
      type,
    });
    if (avatar) {
      const payload = new FormData();
      payload.append('avatarUrl', avatar);
      await api.post(`${ApiRoute.Avatar}/${data.id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    history.push(AppRoute.Login);
  });


export const postComment = createAsyncThunk<Comment, CommentAuth, { extra: Extra }>(
  Action.POST_COMMENT,
  async ({ id, comment, rating }, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<ReviewDto>(`${ApiRoute.Comments}/${id}`, { comment, rating });

    return adaptCommentToClient(data);
  });

export const postFavorite = createAsyncThunk<
  Offer,
  FavoriteAuth,
  { extra: Extra }
>(Action.POST_FAVORITE, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.post<OfferDto>(
      `${ApiRoute.Favorite}/${id}/${OFFER_STATUSES.FAVORITE}`
    );

    return adaptOfferToClient(data);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NoAuth) {
      history.push(AppRoute.Login);
    }

    return Promise.reject(error);
  }
});

export const deleteFavorite = createAsyncThunk<
  Offer,
  FavoriteAuth,
  { extra: Extra }
>(Action.DELETE_FAVORITE, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.post<OfferDto>(
      `${ApiRoute.Favorite}/${id}/${OFFER_STATUSES.NOT_FAVORITE}`
    );

    return adaptOfferToClient(data);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NoAuth) {
      history.push(AppRoute.Login);
    }

    return Promise.reject(error);
  }
});

const postImages = async (api: AxiosInstance, status: number, offerId: string, offer: NewOrEditOffer) => {
  if (status === HttpCode.Created || status === HttpCode.OK) {
    if (offer.previewImage) {
      const payload = new FormData();
      payload.append('previewImage', offer.previewImage);
      await api.post(`${ApiRoute.Offers}/${offerId}/previewImage`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    if (offer.images.length) {
      const payload = new FormData();
      offer.images
        .filter((offerImage) => offerImage)
        .map(async (offerImage) => {
          payload.append('photos', offerImage);
        });
      await api.post(`${ApiRoute.Offers}/${offerId}/image`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
  }
};

