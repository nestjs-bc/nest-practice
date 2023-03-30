import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtManagerStrategy extends PassportStrategy(
  Strategy,
  'jwtmanager',
) {
  constructor(
    private usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const userData = await this.usersService.findOne(payload.username);
    if (userData.role != 'manager' && userData.role != 'super')
      throw new UnauthorizedException();
    return {
      id: userData.id,
      email: userData.email,
      isActive: userData.isActive,
      role: userData.role,
    };
  }
}
