import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { User } from '../auth/user.entity';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

const mockUserFactory = () => {
  const mockUser: User = new User();
  mockUser.id = 'cates-id';
  mockUser.username = 'cate';
  mockUser.password = 'cates-password';
  return mockUser;
};

const mockUser = mockUserFactory();

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository; //: TasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = await module.get(TasksService);
    tasksRepository = await module.get(TasksRepository);
  });

  describe('#getTasks', () => {
    it('calls tasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  
});
