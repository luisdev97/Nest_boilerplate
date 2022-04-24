import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert() async hashPassword() {
    const SALT_ROUNDS = 15;
    const salt = genSaltSync(SALT_ROUNDS);
    this.password = hashSync(this.password, salt);
  }
}
