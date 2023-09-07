import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource } from 'typeorm';
import { customUsersRepositoryMethods } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    {
      provide: getRepositoryToken(User),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // Override default repository for User with a custom one
        return dataSource
          .getRepository(User)
          .extend(customUsersRepositoryMethods);
      },
    },
    AuthService,
  ],
})
export class AuthModule {}
