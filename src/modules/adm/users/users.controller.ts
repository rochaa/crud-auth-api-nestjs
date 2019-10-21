import { Controller, Post, Req, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Guid } from 'guid-typescript';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from './users.enum';
import { UsersService } from './users.service';
import { AuthService } from '../../../shared/auth/auth.service';
import { ResultDto } from '../../../shared/result/result.dto';

@Controller('v1/users')
@ApiUseTags('Users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    @Post()
    async post(@Body() userDto: CreateUserDto) {
        const user = await this.usersService.create(userDto);
        return new ResultDto(null, true, { id: user.id }, null);
    }

    @Post('authenticate')
    async authenticate(
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        const user = await this.usersService.authenticate(email, password);

        if (!user)
            throw new HttpException(new ResultDto('Usuário ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);

        if (user.status == UserStatus.Inativo)
            throw new HttpException(new ResultDto('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);

        const token = await this.authService.createToken(user.email, user.roles);
        return new ResultDto(null, true, token, null);
    }

    @Post('reset-password')
    async resetPassword(@Body() email: string) {
        // TODO: Enviar E-mail com a senha

        const password = Guid.create().toString().substring(0, 8).replace('-', '');
        await this.usersService.update(email, { password: password });
        return new ResultDto('Uma nova senha foi enviada para seu E-mail', true, null, null);
    }

    // Refresh Token
    @Post('refresh')
    async refreshToken(@Req() request: any) {
        // Gera o token
        const token = await this.authService.createToken(request.email, request.roles);
        return new ResultDto(null, true, token, null);
    }
}