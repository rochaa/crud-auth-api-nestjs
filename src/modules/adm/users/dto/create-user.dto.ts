import { IsEmail, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../users.enum';

export class CreateUserDto {
    @IsEmail({}, { message: 'E-mail inválido' })
    readonly email: string;

    @MinLength(6, { message: 'Senha com menos de 6 caracteres' })
    readonly password: string;

    @IsEnum(UserRole, { each: true, message: 'Perfil não encontrado' })
    readonly roles: string[];
}