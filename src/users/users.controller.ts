import { Controller, Get, Inject, UseGuards, Request, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { WinstonLogger, WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { JwtManagerAuthGuard } from 'src/auth/jwtmanager-auth.guard';
import { TransformInterceptor } from 'src/utils/transform.Intercepter';
import { UsersService } from './users.service';

@Controller('admin')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private usersService: UsersService,
  ) {}
  @UseGuards(JwtManagerAuthGuard)
  @Get('users')
  async listUsers(@Request() req) {
    const users = await this.usersService.findAll({ role: 'END' }, null);
    return { message: 'success', result: users };
  }
  @UseGuards(JwtManagerAuthGuard)
  @Get('managers')
  async listManagers(@Request() req) {
    const users = await this.usersService.findAll({ role: 'manager' }, null);
    return { message: 'success', result: users };
  }
}
