import {
    Controller, Post, Req, Body, HttpStatus, HttpCode,
    NotFoundException, UseGuards
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { AuthService } from '../../../shared/auth/auth.service';
import { ResultDto } from '../../../shared/result/result.dto';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from '../../../shared/auth/auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResultExceptionDto } from '../../../shared/result/result-exception.dto';

@Controller('v1/accounts')
@ApiUseTags('Accounts')
export class AccountsController {
    constructor(
        private accountsService: AccountsService,
        private authService: AuthService
    ) { }

    @Post('authenticate')
    async authenticate(@Body() authenticateDto: AuthenticateDto) {
        const token = await this.accountsService.authenticate(authenticateDto.email, authenticateDto.password);
        return new ResultDto(null, true, { token }, null);
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.NO_CONTENT)
    async resetPassword(@Body('email') email: string) {
        const user = await this.accountsService.resetPassword(email);
        if (!user)
            throw new NotFoundException(new ResultExceptionDto('Registro não encontrado', null));
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    async refreshToken(@Req() request: any) {
        const token = await this.authService.createToken(request.user.email, request.user.roles);
        return new ResultDto(null, true, { token }, null);
    }

    @Post('change-password')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request: any, @Body() passwordDto: ChangePasswordDto): Promise<any> {
        const user = await this.accountsService.changePassword(request.user.email, passwordDto);
        if (!user)
            throw new NotFoundException(new ResultExceptionDto('Registro não encontrado', null));
    }
}