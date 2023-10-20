import { Request } from 'express';
import { RequestParams } from '../../../types/request.params.type.js';
import { RequestBody } from '../../../types/request-body-type.js';
import { CreateReviewDto } from '../dto/create-review.dto.js';

export type CreateReviewRequest = Request<RequestParams, RequestBody, CreateReviewDto>
