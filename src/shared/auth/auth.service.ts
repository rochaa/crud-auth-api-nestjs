import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async createToken(email: any, roles: string[]) {
        const user: JwtPayload = {
            email: email,
            roles: roles
        };
        return this.jwtService.sign(user);
    }
}