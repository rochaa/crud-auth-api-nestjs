import { Schema, Document } from 'mongoose';

export interface User extends Document {
    email: string,
    password: string,
    roles: string[],
    status: string,
}

export const UserSchema = new Schema({
    email: { type: String, index: { unique: true } },
    password: String,
    roles: [String],
    status: String,
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});