import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export interface IUsersRepository extends Repository<User> {
  this: Repository<User>;
  createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}

export const customUsersRepositoryMethods: Pick<
  IUsersRepository,
  'createUser'
> = {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate record
        throw new ConflictException('user already exists');
      }
      throw new InternalServerErrorException();
    }
  },
};
