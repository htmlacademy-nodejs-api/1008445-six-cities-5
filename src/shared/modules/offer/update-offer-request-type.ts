import { Request } from 'express';
import { RequestParams } from '../../types/request.params.type.js';
import { RequestBody } from '../../types/request-body-type.js';
import { UpdateOfferDto } from './dto/update.offer-dto.js';

export type UpdateOfferRequest = Request<RequestParams, RequestBody, UpdateOfferDto>
