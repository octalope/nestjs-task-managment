import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { FooModule } from './foo/foo.module';

@Module({
  imports: [
    AuthModule,
    TasksModule,
    FooModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    FooModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
