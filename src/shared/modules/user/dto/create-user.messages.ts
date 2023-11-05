export const CREATE_USER_VALIDATION_MESSAGES = {
  EMAIL: {
    INVALID_FORMAT: 'email must be a valid address'
  },
  NAME: {
    INVALID_FORMAT: 'name is required',
    LENGTH_FIELD: 'min length is 1, max is 15',
  },
  PASSWORD: {
    INVALID_FORMAT: 'password is required',
    LENGTH_FIELD: 'min length for password is 6, max is 12'
  },
  TYPE: {
    INVALID: 'Pro value must be pro or regular',
  },
} as const;
