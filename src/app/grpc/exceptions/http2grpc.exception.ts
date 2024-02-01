import {
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Inject,
    LoggerService,
} from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { throwError } from 'rxjs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch(HttpException)
export class Http2GrpcException implements ExceptionFilter<HttpException> {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
    ) {}

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

    catch(exception: HttpException) {
        const statusCode = exception.getStatus();
        const errorResponse = exception.getResponse();

        if (exception.getStatus() >= 500) {
            this.logger.error(exception);
        }

        return throwError(() => ({
            code: Http2GrpcException.HttpStatusCode[statusCode],
            message: JSON.stringify({
                status_code:
                    errorResponse['statusCode'] ||
                    errorResponse['code'] ||
                    statusCode,
                message: errorResponse['message'] || errorResponse['error'],
                errors: errorResponse['errors'] ?? {},
            }),
        }));
    }
}
