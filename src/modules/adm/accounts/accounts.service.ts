import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Md5 } from "md5-typescript";
import { AuthService } from '../../../shared/auth/auth.service';
import { Guid } from 'guid-typescript';
import { UsersService } from '../users/users.service';
import { Password } from '../../../utils/password';
import { UserStatus } from '../users/users.enum';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResultExceptionDto } from '../../../shared/result/result-exception.dto';

@Injectable()
export class AccountsService {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) { }

    async authenticate(email: string, password: string) {
        const user = await this.validateAccount(email, password);
        return await this.authService.createToken(user.email, user.roles);
    }

    async resetPassword(email: string) {
        // TODO: Enviar E-mail com a senha
        const password = Guid.create().toString().substring(0, 8).replace('-', '');
        const passwordEncrypted = Password.encriptyPassword(password);
        return await this.usersService.updatePassword(email, passwordEncrypted);
    }

    async changePassword(email: string, passwordDto: ChangePasswordDto) {
        await this.validateAccount(email, passwordDto.password);
        const passwordEncrypted = Password.encriptyPassword(passwordDto.newPassword);
        return await this.usersService.updatePassword(email, passwordEncrypted);
    }

    private async validateAccount(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        const pass = Md5.init(`${password}${process.env.GIDU_JWT_KEY}`);

        if (!user || (pass.toString() != user.password.toString()))
            throw new UnauthorizedException(new ResultExceptionDto('Usuário ou senha inválidos', null));

        if (user.status == UserStatus.Inativo)
            throw new UnauthorizedException(new ResultExceptionDto('Usuário inativo', null));

        return user;
    }
}
