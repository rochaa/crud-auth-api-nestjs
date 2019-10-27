import { IsEnum } from 'class-validator';
import { UserRole } from '../users.enum';

export class UpdateUserDto {
    @IsEnum(UserRole, { each: true, message: 'Perfil não encontrado' })
    readonly roles: string[];
}