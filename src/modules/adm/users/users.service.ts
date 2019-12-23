import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserStatus } from './users.enum';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Password } from '../../../utils/password';
import { ResultExceptionDto } from '../../../shared/result/result-exception.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(userDto: CreateUserDto) {
        const passwordEncrypted = Password.encriptyPassword(userDto.password);
        const userNew = new this.userModel({
            email: userDto.email,
            password: passwordEncrypted,
            roles: userDto.roles,
            status: UserStatus.Ativo
        });

        if (await this.findByEmail(userNew.email))
            throw new BadRequestException(new ResultExceptionDto('E-mail já está cadastrado.', null));

        return await userNew.save();
    }

    async update(email: string, userDto: UpdateUserDto) {
        const userModified = {
            roles: userDto.roles
        }
        return await this.userModel.findOneAndUpdate({ email }, userModified);
    }

    async updatePassword(email: string, password: string) {
        return await this.userModel.findOneAndUpdate({ email }, { password });
    }

    async delete(id: string) {
        const userDeleted = {
            status: UserStatus.Inativo
        }
        return await this.userModel.findByIdAndUpdate(id, userDeleted);
    }

    async findById(id: string): Promise<User> {
        return await this.userModel.findById(id, 'email roles status -_id').exec();
    }

    async findByEmail(email: string) {
        return await this.userModel.findOne({ email: email }).exec();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel
            .find({}, 'email roles created_at status')
            .sort('-updated_at')
            .limit(30)
            .exec();
    }
}
