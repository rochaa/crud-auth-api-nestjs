import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../shared/jwt/jwt.strategy';

import { AuthService } from '../../shared/auth/auth.service';
import { UsersService } from './users/users.service';

import { UsersController } from './users/users.controller';

import { UserSchema } from './users/user.model';

@Module({
    imports: [
        CacheModule.register(),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: process.env.GIDU_JWT_KEY,
            signOptions: {
                expiresIn: 3600,
            },
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        HttpModule
    ],
    controllers: [UsersController],
    providers: [UsersService, AuthService, JwtStrategy],
})
export class AdmModule { }
