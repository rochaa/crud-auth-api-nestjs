import { MinLength } from 'class-validator';

export class ChangePasswordDto {
    @MinLength(6, { message: 'Senha com menos de 6 caracteres' })
    readonly password: string;

    @MinLength(6, { message: 'Senha com menos de 6 caracteres' })
    readonly newPassword: string;
}