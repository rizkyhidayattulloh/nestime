import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Inject,
    LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
    ) {}

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status: number;
        let message: object;

        if (exception.code !== undefined && exception.details !== undefined) {
            message = isJson(exception.details)
                ? JSON.parse(exception.details)
                : {
                      status_code: 500,
                      message: 'Internal server error',
                      errors: {},
                  };

            if (message['status_code'] === undefined) {
                message['status_code'] = message['status'] || 500;
                delete message['status'];
            }
            status = message['status_code'];
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = {
                status_code: status,
                message: exception.message,
                errors: {},
            };
        }

        if (status >= 500) {
            this.logger.error(exception.message, exception.stack);
        }

        response.status(status).json(message);
    }
}

function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
