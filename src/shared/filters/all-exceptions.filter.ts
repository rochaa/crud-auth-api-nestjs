import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResultDto } from '../result/result.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const result =
            status == HttpStatus.INTERNAL_SERVER_ERROR
                ? new ResultDto("Erro inesperado.", false, request.body, exception)
                : new ResultDto(exception.message.message, false, request.body, exception.message.errors)

        response
            .status(status)
            .json(result);
    }
}