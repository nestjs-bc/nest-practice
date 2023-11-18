import { Controller, Get } from '@nestjs/common';
import { SampleService } from './sample.service';

@Controller('sample')
export class SampleController {
  constructor(private readonly service: SampleService) {}

  @Get('/')
  async something() {
    return this.service.something();
  }
}
