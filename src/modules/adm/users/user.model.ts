import { Schema, Document } from 'mongoose';
import { UserRole, UserStatus } from './users.enum';

export interface User extends Document {
    email: string,
    password: string,
    roles: string[],
    status: string,
}

export const UserSchema = new Schema({
    email: { type: String, required: true, trim: true, index: { unique: true }, },
    password: { type: String, required: true, trim: true, },
    roles: [{
        type: String, required: true,
        enum: [UserRole.Administrador, UserRole.Diacono, UserRole.Secretaria, UserRole.Membro],
        default: UserRole.Membro
    }],
    status: {
        type: String, required: true,
        enum: [UserStatus.Ativo, UserStatus.Inativo],
        default: UserStatus.Ativo
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});