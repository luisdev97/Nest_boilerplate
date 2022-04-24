import { UserEntity } from './../../domain/entities/user.entity';
import { Connection } from 'typeorm';

export const UserRepositoryProvider = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
