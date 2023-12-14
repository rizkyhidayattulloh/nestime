import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { ConfigService } from '@nestjs/config';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>(
        {
            transport: Transport.GRPC,
            options: {
                package: ['user'],
                protoPath: [resolve('proto/user/user.proto')],
                url: `${config.get('app.grpc.host')}:${config.get(
                    'app.grpc.port',
                )}`,
            },
        },
        {
            inheritAppConfig: true,
        },
    );

    app.connectMicroservice<MicroserviceOptions>(
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers: [
                        `${config.get('app.kafka.host')}:${config.get(
                            'app.kafka.port',
                        )}`,
                    ],
                },
                consumer: {
                    groupId: 'my-app',
                    allowAutoTopicCreation: true,
                },
                producer: {
                    createPartitioner: Partitioners.LegacyPartitioner,
                },
            },
        },
        {
            inheritAppConfig: true,
        },
    );

    await app.startAllMicroservices();

    await app.listen(process.env.HTTP_PORT);
}
bootstrap();
