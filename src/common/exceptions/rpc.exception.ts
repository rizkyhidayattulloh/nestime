import { HttpException, HttpStatus } from '@nestjs/common';
import { IError, IException } from './base.exception';
import { status } from '@grpc/grpc-js';

export class RpcExceptionHandler implements IException {
    static HttpStatusCode: Record<number, number> = {
        // standard gRPC error mapping
        // https://cloud.google.com/apis/design/errors#handling_errors
        [HttpStatus.BAD_REQUEST]: status.INVALID_ARGUMENT,
        [HttpStatus.UNAUTHORIZED]: status.UNAUTHENTICATED,
        [HttpStatus.FORBIDDEN]: status.PERMISSION_DENIED,
        [HttpStatus.NOT_FOUND]: status.NOT_FOUND,
        [HttpStatus.CONFLICT]: status.ALREADY_EXISTS,
        [HttpStatus.GONE]: status.ABORTED,
        [HttpStatus.TOO_MANY_REQUESTS]: status.RESOURCE_EXHAUSTED,
        499: status.CANCELLED,
        [HttpStatus.INTERNAL_SERVER_ERROR]: status.INTERNAL,
        [HttpStatus.NOT_IMPLEMENTED]: status.UNIMPLEMENTED,
        [HttpStatus.BAD_GATEWAY]: status.UNKNOWN,
        [HttpStatus.SERVICE_UNAVAILABLE]: status.UNAVAILABLE,
        [HttpStatus.GATEWAY_TIMEOUT]: status.DEADLINE_EXCEEDED,

        // additional built-in http exceptions
        // https://docs.nestjs.com/exception-filters#built-in-http-exceptions
        [HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: status.UNAVAILABLE,
        [HttpStatus.PAYLOAD_TOO_LARGE]: status.OUT_OF_RANGE,
        [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: status.CANCELLED,
        [HttpStatus.UNPROCESSABLE_ENTITY]: status.CANCELLED,
        [HttpStatus.I_AM_A_TEAPOT]: status.UNKNOWN,
        [HttpStatus.METHOD_NOT_ALLOWED]: status.CANCELLED,
        [HttpStatus.PRECONDITION_FAILED]: status.FAILED_PRECONDITION,
    };

    private statusCode: status;
    private response: string;

    constructor(exception: HttpException) {
        const statusCode = exception.getStatus();
        const response = exception.getResponse() as IError;

        if (response.status_code == undefined) {
            if (response['code'] != undefined) {
                response.status_code = response['code'];
            } else if (response['statusCode'] != undefined) {
                response.status_code = response['statusCode'];
            } else {
                response.status_code = statusCode;
            }
        }

        this.statusCode = RpcExceptionHandler.HttpStatusCode[statusCode];
        this.response = JSON.stringify(response);
    }

    getStatusCode(): status {
        return this.statusCode;
    }

    getResponse(): string {
        return this.response;
    }
}
