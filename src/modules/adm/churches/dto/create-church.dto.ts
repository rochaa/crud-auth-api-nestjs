import { Length } from 'class-validator';

export class CreateChurchDto {
    @Length(5, 80, { message: 'Nome da igreja precisa ser entre 5 e 80 caracteres' })
    readonly name: string;

    readonly cnpj: string;

    readonly churchRoot: string;
}