export const LOGIN_USER_BAD_PARAMS_FIXTURE = {
  email: 'mail@gmail.com',
  password: null,
};

export const LOGIN_USER_VALID_PARAMS_FIXTURE = {
  email: 'mail@gmail.com',
  password: 'password',
};

export const INVALID_CREDENTIALS_RESPONSE_FIXTURE = {
  email: 'mail@gmail.com',
  password: 'invalid_hashed_password',
};
