import { HttpException } from '@nestjs/common';
import { IError, IException } from './base.exception';

export class HttpExceptionHandler implements IException {
    private statusCode: number;
    private response: IError;

    constructor(exception: HttpException) {
        this.statusCode = exception.getStatus();

        const response = {} as IError;
        const exceptionRes = exception.getResponse();

        response.status_code =
            exceptionRes['code'] ??
            exceptionRes['statusCode'] ??
            exceptionRes['status_code'] ??
            this.statusCode;
        response.message = exceptionRes['message'] ?? 'Something went wrong';
        response.errors = exceptionRes['errors'] ?? [];

        this.response = response;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    getResponse(): IError {
        return this.response;
    }
}
