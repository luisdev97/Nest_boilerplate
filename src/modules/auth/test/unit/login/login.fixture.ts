import { LoginInputDto } from './../../../src/infrastructure/controllers/v1/login/login.input.dto';

export const VALID_USER_LOGIN_INPUT_FIXTURE: LoginInputDto = {
  email: 'mail@gmail.com',
  password: 'password',
};

export const INVALID_CREDENTIALS_RESPONSE_FIXTURE = {
  email: 'mail@gmail.com',
  password: 'invalid_hashed_password',
};

export const VALID_CREDENTIALS_RESPONSE_FIXTURE = {
  email: 'mail@gmail.com',
  password: '$2a$15$WQk0Q68EK9X0BghbeyX0R.sxynGTtTnwSkw39ux7ZhAsMEt24NhOC',
};
