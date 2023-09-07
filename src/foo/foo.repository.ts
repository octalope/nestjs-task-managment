import { DataSource, Repository } from 'typeorm';
import { CreateFooDto } from './dto/create-foo.dto';
import { Foo } from './foo.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class FooRepository extends Repository<Foo> {
  constructor(private dataSource: DataSource) {
    super(Foo, dataSource.createEntityManager());
  }

  async createFoo(createFooDto: CreateFooDto): Promise<void> {
    const { bar, baz } = createFooDto;
    const foo = this.create({ bar, baz });
    try {
      await this.save(foo);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate record
        throw new ConflictException('foo already exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
