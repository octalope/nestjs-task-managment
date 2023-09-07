import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DataSource } from 'typeorm';
import { customTasksRepositoryMethods } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    {
      provide: getRepositoryToken(Task),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // Override default repository for Task with a custom one
        return dataSource
          .getRepository(Task)
          .extend(customTasksRepositoryMethods);
      },
    },
    TasksService,
  ],
})
export class TasksModule {}
