import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return await this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string): Promise<void> {
    await this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  async updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return await this.tasksService.updateTaskStatus(id, status);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }
}
