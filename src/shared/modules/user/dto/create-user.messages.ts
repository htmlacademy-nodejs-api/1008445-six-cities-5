export const CREATE_USER_VALIDATION_MESSAGES = {
  EMAIL: {
    INVALID_FORMAT: 'email must be a valid address'
  },
  AVATAR_URL: {
    INVALID_FORMAT: 'avatarUrl is required',
  },
  NAME: {
    INVALID_FORMAT: 'name is required',
    LENGTH_FIELD: 'min length is 1, max is 15',
  },
  PASSWORD: {
    INVALID_FORMAT: 'password is required',
    LENGTH_FIELD: 'min length for password is 6, max is 12'
  },
  IS_PRO: {
    INVALID_FORMAT: 'Pro value must be a boolean',
  },
} as const;
