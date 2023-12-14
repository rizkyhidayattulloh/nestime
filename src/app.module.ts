import { HttpStatus, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { SchedulerProvider } from './providers/scheduler.provider';
import { QueueProvider } from './providers/queue.provider';
import { GrpcModule } from './app/grpc/grpc.module';
import { KafkaModule } from './app/kafka/kafka.module';
import { HttpModule } from './app/http/http.module';
import { PrismaModule } from 'nestjs-prisma';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { BaseException } from './common/exceptions/base.exception';
import { ValidationException } from './common/exceptions/validation.exception';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: config,
        }),
        PrismaModule.forRoot({
            isGlobal: true,
        }),
        QueueProvider,
        SchedulerProvider,
        KafkaModule,
        HttpModule,
        GrpcModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: BaseException,
        },
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                stopAtFirstError: true,
                transform: true,
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                exceptionFactory: (errors) => {
                    return new ValidationException(errors);
                },
            }),
        },
    ],
})
export class AppModule {}
