import { HttpStatus, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';
import { SchedulerProvider } from './providers/scheduler.provider';
import { QueueProvider } from './providers/queue.provider';
import { CustomPrismaModule } from 'nestjs-prisma';
import { APP_PIPE } from '@nestjs/core';
import { extendedPrismaClient } from '@/prisma/prisma.extension';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { WinstonModule, utilities as WinstonUtilities } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { ValidationException } from '@/common/validations/validation.exception';
import { HttpModule } from '@/app/http/http.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: config,
        }),
        CustomPrismaModule.forRootAsync({
            name: 'PrismaService',
            isGlobal: true,
            useFactory: () => {
                return extendedPrismaClient;
            },
        }),
        ClientsModule.registerAsync({
            isGlobal: true,
            clients: [
                {
                    inject: [ConfigService],
                    name: 'KAFKA_CLIENT',
                    useFactory: (config: ConfigService) => ({
                        transport: Transport.KAFKA,
                        options: {
                            client: {
                                brokers: config.get('app.kafka.brokers'),
                            },
                            producer: {
                                createPartitioner:
                                    Partitioners.DefaultPartitioner,
                            },
                        },
                    }),
                },
            ],
        }),
        WinstonModule.forRoot({
            transports: [
                // file on daily rotation (error only)
                new transports.DailyRotateFile({
                    // %DATE will be replaced by the current date
                    filename: `logs/%DATE%-error.log`,
                    level: 'error',
                    format: format.combine(format.timestamp(), format.json()),
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: false, // don't want to zip our logs
                    maxFiles: '30d', // will keep log until they are older than 30 days
                }),
                // same for all levels
                new transports.DailyRotateFile({
                    filename: `logs/%DATE%-combined.log`,
                    format: format.combine(format.timestamp(), format.json()),
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: false,
                    maxFiles: '30d',
                }),
                new transports.Console({
                    format: format.combine(
                        format.timestamp(),
                        WinstonUtilities.format.nestLike(),
                    ),
                }),
            ],
        }),
        QueueProvider,
        SchedulerProvider,
        // register you app layer modules here
        HttpModule,
    ],
    providers: [
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
