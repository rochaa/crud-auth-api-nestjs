import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Church } from './church.model';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { isNullOrUndefined } from 'util';
import { ResultExceptionDto } from '../../../shared/result/result-exception.dto';

@Injectable()
export class ChurchesService {

    constructor(@InjectModel('Church') private readonly churchModel: Model<Church>) { }

    async create(churchDto: CreateChurchDto) {
        const churchNew = new this.churchModel({
            name: churchDto.name,
            cnpj: churchDto.cnpj.replace(/[^\d]+/g, ''),
            churchRoot: churchDto.churchRoot,
            isCongregation: !isNullOrUndefined(churchDto.churchRoot)
        });
        const churchRoot = churchDto.churchRoot ? await this.findByChurch(churchDto.churchRoot) : null;

        if (!isNullOrUndefined(churchDto.churchRoot) && churchRoot.length == 0)
            throw new BadRequestException(new ResultExceptionDto('Igreja não encontrada', null));

        return await churchNew.save();
    }

    async update(id: string, churchDto: UpdateChurchDto) {
        const churchModified = {
            name: churchDto.name,
            cnpj: churchDto.cnpj.replace(/[^\d]+/g, '')
        }
        return await this.churchModel.findByIdAndUpdate(id, churchModified);
    }

    async findById(id: string): Promise<Church> {
        return await this.churchModel.findById(id, 'name cnpj churchRoot isCongregation -_id')
            .populate('churchRoot', 'name cnpj')
            .exec();
    }

    async findByName(name: string) {
        return await this.churchModel.find({ name: new RegExp(name, "i") }).exec();
    }

    async findByChurch(churchId: string) {
        return await this.churchModel.find({ _id: churchId, isCongregation: false }).exec();
    }

    async findAll(): Promise<Church[]> {
        return await this.churchModel
            .find({}, 'name cnpj churchRoot isCongregation')
            .sort('-updated_at')
            .limit(30)
            .exec();
    }
}
