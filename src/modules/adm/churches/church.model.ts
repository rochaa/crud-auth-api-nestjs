import { Schema, Document } from 'mongoose';

export interface Church extends Document {
    name: string,
    cnpj: string,
    churchRoot: string,
    isCongregation: boolean
}

export const ChurchSchema = new Schema({
    name: String,
    cnpj: String,
    churchRoot: { type: Schema.Types.ObjectId, ref: 'Church', required: false },
    isCongregation: Boolean
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});