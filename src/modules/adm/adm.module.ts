import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../shared/auth/jwt.strategy';

import { AuthService } from '../../shared/auth/auth.service';
import { UsersService } from './users/users.service';
import { AccountsService } from './accounts/accounts.service';

import { UsersController } from './users/users.controller';
import { AccountsController } from './accounts/accounts.controller';

import { UserSchema } from './users/user.model';

@Module({
    imports: [
        CacheModule.register(),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.GIDU_JWT_KEY,
            signOptions: {
                expiresIn: 3600,
            },
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        HttpModule
    ],
    controllers: [UsersController, AccountsController],
    providers: [UsersService, AccountsService, AuthService, JwtStrategy],
})
export class AdmModule { }
