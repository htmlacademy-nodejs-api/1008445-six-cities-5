import { CREATE_USER_RESTRICTIONS } from './create-user.dto.constant.js';

export const CREATE_USER_VALIDATION_MESSAGES = {
  EMAIL: {
    INVALID_FORMAT: 'email must be a valid address'
  },
  NAME: {
    INVALID_FORMAT: 'name is required',
    LENGTH_FIELD: `user name min length is ${ CREATE_USER_RESTRICTIONS.NAME_MIN_LENGTH }, max is ${ CREATE_USER_RESTRICTIONS.NAME_MAX_LENGTH }`,
  },
  PASSWORD: {
    INVALID_FORMAT: 'password is required',
    LENGTH_FIELD: `user min length for password is ${ CREATE_USER_RESTRICTIONS.PASSWORD_MAX_LENGTH }, max is ${ CREATE_USER_RESTRICTIONS.PASSWORD_MAX_LENGTH }`
  },
  TYPE: {
    INVALID: 'Pro value must be pro or regular',
  },
} as const;
