import { IDomainError } from './../../../../shared/domain/error/domain-error.interface';
import { DomainError } from './../../../../shared/domain/error/domain-error';
import { HttpStatus } from '@nestjs/common';

const CREATE_USER_INVALID_PARAMS_ERROR: IDomainError = {
  code: HttpStatus.BAD_REQUEST,
  message: 'Password and email are required for user registration',
};
export class CreateUserInvalidParamsError extends DomainError {
  constructor() {
    super(CREATE_USER_INVALID_PARAMS_ERROR);
  }
}
