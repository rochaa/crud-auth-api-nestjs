import { IsEmail, IsEnum, ValidatorConstraint } from 'class-validator';
import { UserRole } from '../users.enum';

@ValidatorConstraint()
export class UpdateUserDto {
    @IsEmail({}, { message: 'Email inválido' })
    readonly email: string;

    @IsEnum(UserRole, { each: true, message: 'Perfil não encontrado' })
    readonly roles: string[];
}