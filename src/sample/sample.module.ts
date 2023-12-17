import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { SomethingReturn } from './util/something-return';

@Module({
  controllers: [SampleController],
  providers: [SampleService, SomethingReturn],
})
export class SampleModule {}
