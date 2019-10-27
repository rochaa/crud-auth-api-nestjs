import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Church } from './church.model';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';

@Injectable()
export class ChurchesService {

    constructor(@InjectModel('Church') private readonly churchModel: Model<Church>) { }

    async create(churchDto: CreateChurchDto) {
        const churchNew = new this.churchModel({
            name: churchDto.name,
            cnpj: churchDto.cnpj,
            churchRoot: churchDto.churchRoot
        });

        return await churchNew.save();
    }

    async update(id: string, churchDto: UpdateChurchDto) {
        const churchModified = {
            name: churchDto.name,
            cnpj: churchDto.cnpj
        }
        return await this.churchModel.findByIdAndUpdate(id, churchModified);
    }

    async findById(id: string): Promise<Church> {
        return await this.churchModel.findById(id, 'name cnpj churchRoot -_id').exec();
    }

    async findByName(name: string) {
        return await this.churchModel.find({ name: name }).exec();
    }

    async findAll(): Promise<Church[]> {
        return await this.churchModel
            .find({}, 'name cnpj churchRoot')
            .sort('-updated_at')
            .limit(30)
            .exec();
    }
}
