import { Request } from 'express';
import { RequestBody } from '../../../types/request-body-type.js';
import { CreateReviewDto } from '../dto/create-review.dto.js';
import { ParamOfferId } from '../../offer/types/param-offer-id.type.js';

export type CreateReviewRequest = Request<ParamOfferId, RequestBody, CreateReviewDto>
