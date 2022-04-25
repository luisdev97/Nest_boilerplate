import { IDomainError } from '../../../../shared/domain/error/domain-error.interface';
import { DomainError } from '../../../../shared/domain/error/domain-error';
import { HttpStatus } from '@nestjs/common';

const USER_NOUT_FOUND_ERROR: IDomainError = {
  code: HttpStatus.NOT_FOUND,
  message: 'User not found with this params',
};
export class UserNotFoundError extends DomainError {
  constructor() {
    super(USER_NOUT_FOUND_ERROR);
  }
}
