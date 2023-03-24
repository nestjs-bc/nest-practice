import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy'; // ID PW 틀리면 Unauth 에러 리턴 / 맞으면 user
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { jwtConstants } from 'src/secret/jwtCont';
import { JwtStrategy } from './jwt.strategy'; // added
import { UsersService } from 'src/users/users.service';
import { JwtUserStrategy } from './jwtuser.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UsersService,
    JwtUserStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
