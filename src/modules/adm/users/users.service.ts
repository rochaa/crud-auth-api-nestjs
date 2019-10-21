import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Md5 } from "md5-typescript";
import { UserStatus } from './users.enum';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }

    async findByEmail(email: string) {
        return await this.userModel.findOne({ email: email }).exec();
    }

    async create(userDto: CreateUserDto) {
        const password = Md5.init(`${userDto.password}${process.env.GIDU_JWT_KEY}`);
        const _user = new this.userModel(userDto);

        _user.password = password;

        return await _user.save();
    }

    async update(email: string, user: any) {
        return await this.userModel.findOneAndUpdate({ email }, user);
    }

    async authenticate(email: string, password: string) {
        var user = await this.userModel.findOne({ email: email }).exec();
        const pass = Md5.init(`${password}${process.env.GIDU_JWT_KEY}`);

        if (pass.toString() == user.password.toString()) {
            return user;
        } else {
            return null;
        }
    }
}
