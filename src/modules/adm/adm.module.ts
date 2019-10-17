import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';

import { AuthService } from 'src/shared/auth/auth.service';

import { JwtStrategy } from 'src/shared/jwt/jwt.strategy';

@Module({
    imports: [
        CacheModule.register(),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: process.env.JWT_KEY,
            signOptions: {
                expiresIn: 3600,
            },
        }),
        HttpModule,
        UsersModule
    ],
    controllers: [],
    providers: [AuthService, JwtStrategy],
})
export class AdmModule { }
