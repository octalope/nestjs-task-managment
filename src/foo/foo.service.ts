import { Injectable } from '@nestjs/common';
import { FooRepository } from './foo.repository';
import { CreateFooDto } from './dto/create-foo.dto';

@Injectable()
export class FooService {
  constructor(private fooRepository: FooRepository) {}

  async createFoo(createFooDto: CreateFooDto): Promise<void> {
    return this.fooRepository.createFoo(createFooDto);
  }
}
