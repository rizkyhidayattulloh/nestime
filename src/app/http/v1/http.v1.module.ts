import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { SampleController } from '@/app/http/v1/handlers/sample/sample.controller';
import { HttpExceptionFilter } from '@/app/http/v1/exceptions/http.exception';
import { SampleModule } from '@/modules/sample/sample.module';

@Module({
    imports: [SampleModule],
    controllers: [SampleController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class HttpV1Module {}
