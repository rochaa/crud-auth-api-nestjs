import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/modules/adm/users/user.model';
import { Md5 } from "md5-typescript";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }

    async create(user: User) {
        const password = Md5.init(`${user.password}${process.env.JWT_KEY}`);
        const _user = new this.userModel(user);

        _user.password = password;
        _user.status = UserStatus.Ativo;

        return await _user.save();
    }

    async findByEmail(email: string) {
        return await this.userModel.findOne({ email: email }).exec();
    }

    async update(email: string, user: any) {
        return await this.userModel.findOneAndUpdate({ email }, user);
    }

    async authenticate(email: string, password: string) {
        var user = await this.userModel.findOne({ email: email }).exec();
        const pass = Md5.init(`${password}${process.env.JWT_KEY}`);

        if (pass.toString() == user.password.toString()) {
            return user;
        } else {
            return null;
        }
    }
}
