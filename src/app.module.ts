import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'taskuser',
      password: '34Ta5kUs3r!',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
