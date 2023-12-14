import {
    ArgumentsHost,
    Catch,
    ContextType,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { HttpExceptionHandler } from './http.exception';
import { RpcExceptionHandler } from './rpc.exception';
import { Response } from 'express';

@Catch(HttpException)
export class BaseException implements ExceptionFilter<HttpException> {
    catch(exception: HttpException, host: ArgumentsHost): Observable<any> {
        const type = host.getType();
        const errorException = ExceptionFactory.create(exception, type);

        if (type === 'http') {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();

            response
                .status(errorException.getStatusCode())
                .json(errorException.getResponse());

            return;
        } else if (type === 'rpc') {
            return throwError(() => ({
                code: errorException.getStatusCode(),
                message: errorException.getResponse(),
            }));
        }
    }
}

export class ExceptionFactory {
    static create(exception: HttpException, type: ContextType): IException {
        if (type === 'http') {
            return new HttpExceptionHandler(exception);
        } else if (type === 'rpc') {
            return new RpcExceptionHandler(exception);
        }
    }
}

export interface IException {
    getStatusCode(): number;
    getResponse(): IError | string;
}

export interface IError<T = any> {
    status_code: number;
    message: string;
    errors?: T[];
}
