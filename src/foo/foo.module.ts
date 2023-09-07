import { Module } from '@nestjs/common';
import { FooService } from './foo.service';
import { FooController } from './foo.controller';
import { FooRepository } from './foo.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foo } from './foo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Foo])],
  controllers: [FooController],
  providers: [FooService, FooRepository],
})
export class FooModule {}
