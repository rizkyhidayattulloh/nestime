import {
    Catch,
    ExceptionFilter,
    HttpStatus,
    Inject,
    InternalServerErrorException,
    LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { throwError } from 'rxjs';
import { status } from '@grpc/grpc-js';

@Catch()
export class GrpcException implements ExceptionFilter {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
    ) {}

    catch(exception: unknown) {
        this.logger.error(exception);

        const errorResponse = new InternalServerErrorException();

        return throwError(() => ({
            code: status.INTERNAL,
            message: JSON.stringify({
                status_code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: errorResponse['message'] || errorResponse['error'],
                errors: errorResponse['errors'] ?? {},
            }),
        }));
    }
}
