import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/adm/users/users.service';
import { JwtPayload } from 'src/shared/jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async createToken(email: any, roles: string[]) {
        const user: JwtPayload = {
            email: email,
            roles: roles
        };
        return this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        // return await this.accountService.findOneByUsername(payload.username);
        return payload;
    }
}