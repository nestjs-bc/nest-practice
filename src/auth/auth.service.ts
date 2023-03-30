import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { PwCompare } from 'src/utils/PwTransformer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new UnauthorizedException();

    const isValid = await PwCompare(pass, user);
    if (isValid) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(user: any) {
    const payload = { username: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: User) {
    await this.usersService.create(user);
    return user.email;
  }

  async registerManager(user: User) {
    user.role = 'manager';
    await this.usersService.create(user);
    return user.email;
  }
}
