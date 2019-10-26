import { IsEnum, ValidatorConstraint } from 'class-validator';
import { UserRole } from '../users.enum';

@ValidatorConstraint()
export class UpdateUserDto {
    @IsEnum(UserRole, { each: true, message: 'Perfil não encontrado' })
    readonly roles: string[];
}