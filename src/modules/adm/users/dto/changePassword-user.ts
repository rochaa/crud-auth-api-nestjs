import { IsEmail, MinLength } from 'class-validator';

export class ChangePasswordUserDto {
    @IsEmail({}, { message: 'E-mail inválido' })
    readonly email: string;

    @MinLength(6, { message: 'Senha com menos de 6 caracteres' })
    readonly password: string;
}