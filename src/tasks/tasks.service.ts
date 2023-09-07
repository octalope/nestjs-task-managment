import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const task: Task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return task;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task: Task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
