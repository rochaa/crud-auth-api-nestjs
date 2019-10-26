import {
    Controller, Post, Body, HttpStatus, Put, Param, HttpCode,
    NotFoundException, Delete, Get, UseGuards
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ResultDto } from '../../../shared/result/result.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../../shared/auth/auth.guard';
import { ResultExceptionDto } from '../../../shared/result/result-exception.dto';
import { Roles } from '../../../shared/decorators/roles.decorators';
import { UserRole } from './users.enum';

@Controller('v1/users')
@ApiUseTags('Users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    @Post()
    @Roles(UserRole.Administrador)
    async post(@Body() userDto: CreateUserDto) {
        const user = await this.usersService.create(userDto);
        return new ResultDto(null, true, { _id: user._id }, null);
    }

    @Put(':email')
    @HttpCode(HttpStatus.NO_CONTENT)
    async put(@Param('email') email: string, @Body() userDto: UpdateUserDto) {
        const user = await this.usersService.update(email, userDto);
        if (!user)
            throw new NotFoundException(new ResultExceptionDto('Registro não encontrado', null));
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const user = await this.usersService.delete(id);
        if (!user)
            throw new NotFoundException(new ResultExceptionDto('Registro não encontrado', null));
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const user = await this.usersService.findById(id);
        return new ResultDto(null, true, user, null);
    }

    @Get()
    async getAll() {
        const users = await this.usersService.findAll();
        return new ResultDto(null, true, users, null);
    }
}