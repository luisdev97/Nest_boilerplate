import { IDomainError } from './../../../../shared/domain/error/domain-error.interface';
import { DomainError } from './../../../../shared/domain/error/domain-error';
import { HttpStatus } from '@nestjs/common';

const INVALID_CREDENTIALS_ERROR: IDomainError = {
  code: HttpStatus.UNAUTHORIZED,
  message: 'The credentials are not valid',
};
export class InvalidCredentialsError extends DomainError {
  constructor() {
    super(INVALID_CREDENTIALS_ERROR);
  }
}
