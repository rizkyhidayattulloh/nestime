import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Partitioners } from 'kafkajs';
import { useContainer } from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.connectMicroservice<MicroserviceOptions>(config.get('app.grpc'), {
        inheritAppConfig: true,
    });

    app.connectMicroservice<MicroserviceOptions>(
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers: config.get('app.kafka.brokers'),
                },
                consumer: {
                    allowAutoTopicCreation: true,
                    groupId: config.get('app.kafka.consumer.groupId'),
                },
                producer: {
                    createPartitioner: Partitioners.LegacyPartitioner,
                },
                subscribe: {
                    fromBeginning: true,
                },
            },
        },
        {
            inheritAppConfig: true,
        },
    );

    await app.startAllMicroservices();
    await app.listen(config.get('app.http.port'));
}
bootstrap();
