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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtSuperStrategy } from './jwtsuper.strategy';
import { JwtManagerStrategy } from './jwtmanager.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UsersService,
    JwtUserStrategy,
    JwtSuperStrategy,
    JwtManagerStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
