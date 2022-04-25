import { IDomainError } from './domain-error.interface';

export class DomainError extends Error {
  constructor(private readonly error: IDomainError) {
    super(error.message);
  }
}
