import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get('')
  healthCheck(): string {
    return 'im healthy';
  }
  // constructor(private readonly appService: AppService) {}
}
