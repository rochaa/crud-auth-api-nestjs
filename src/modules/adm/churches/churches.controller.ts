import {
    Controller, Post, Body, HttpStatus, Put, Param, HttpCode,
    NotFoundException, Get, UseGuards, Query
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CreateChurchDto } from './dto/create-church.dto';
import { ChurchesService } from './churches.service';
import { ResultDto } from '../../../shared/result/result.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { JwtAuthGuard } from '../../../shared/auth/auth.guard';
import { ResultExceptionDto } from '../../../shared/result/result-exception.dto';
import { Roles } from '../../../shared/decorators/roles.decorators';
import { UserRole } from '../users/users.enum';

@Controller('v1/churches')
@ApiUseTags('Churches')
@UseGuards(JwtAuthGuard)
export class ChurchesController {
    constructor(
        private churchesService: ChurchesService
    ) { }

    @Post()
    @Roles(UserRole.Administrador)
    async post(@Body() churchDto: CreateChurchDto) {
        const church = await this.churchesService.create(churchDto);
        return new ResultDto(null, true, { _id: church._id }, null);
    }

    @Put(':id')
    @Roles(UserRole.Administrador)
    @HttpCode(HttpStatus.NO_CONTENT)
    async put(@Param('id') id: string, @Body() churchDto: UpdateChurchDto) {
        const church = await this.churchesService.update(id, churchDto);
        if (!church)
            throw new NotFoundException(new ResultExceptionDto('Registro não encontrado', null));
    }

    @Get()
    @Roles(UserRole.Administrador)
    async getAll() {
        const churches = await this.churchesService.findAll();
        return new ResultDto(null, true, churches, null);
    }

    @Get('getbyfilters')
    @Roles(UserRole.Administrador)
    async getByFilters(@Query() query: any) {
        const churches = await this.churchesService.findByName(query.name);
        return new ResultDto(null, true, churches, null);
    }
}