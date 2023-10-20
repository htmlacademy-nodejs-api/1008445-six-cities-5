import { Request } from 'express';
import { RequestBody } from '../../types/request-body-type.js';
import { UpdateOfferDto } from './dto/update.offer-dto.js';
import { ParamOfferId } from './types/param-offer-id.type.js';

export type UpdateOfferRequest = Request<ParamOfferId, RequestBody, UpdateOfferDto>
