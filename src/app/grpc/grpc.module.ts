import { Module } from '@nestjs/common';
import { SampleController } from '@/app/grpc/handlers/sample/sample.controller';
import { APP_FILTER } from '@nestjs/core';
import { GrpcException } from '@/app/grpc/exceptions/grpc.exception';
import { Http2GrpcException } from '@/app/grpc/exceptions/http2grpc.exception';
import { SampleModule } from '@/modules/sample/sample.module';

@Module({
    imports: [SampleModule],
    controllers: [SampleController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GrpcException,
        },
        {
            provide: APP_FILTER,
            useClass: Http2GrpcException,
        },
    ],
})
export class GrpcModule {}
