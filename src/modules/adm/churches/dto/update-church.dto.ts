import { Length } from 'class-validator';
import { isCnpjValid } from '../../../../utils/cnpj';

export class UpdateChurchDto {
    @Length(5, 80, { message: 'Nome da igreja precisa ser entre 5 e 80 caracteres' })
    readonly name: string;

    @isCnpjValid({ message: 'Cnpj da igreja inválido' })
    readonly cnpj: string;
}