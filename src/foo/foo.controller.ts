import { Body, Controller, Post } from '@nestjs/common';
import { FooService } from './foo.service';
import { CreateFooDto } from './dto/create-foo.dto';

@Controller('foo')
export class FooController {
  constructor(private fooService: FooService) {}

  @Post('/new')
  async signUp(@Body() createFooDto: CreateFooDto): Promise<void> {
    return await this.fooService.createFoo(createFooDto);
  }
}
