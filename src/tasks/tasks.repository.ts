import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

export interface ITasksRepository extends Repository<Task> {
  this: Repository<Task>;
  createTask({
    createTaskDto,
  }: {
    createTaskDto: CreateTaskDto;
  }): Promise<Task>;

  getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>;
}

export const customTasksRepositoryMethods: Pick<
  ITasksRepository,
  'createTask' | 'getTasks'
> = {
  async createTask({
    createTaskDto,
  }: {
    createTaskDto: CreateTaskDto;
  }): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  },
  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  },
};
