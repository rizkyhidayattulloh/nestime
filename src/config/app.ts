import { registerAs } from '@nestjs/config';
import { resolve } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { Transport } from '@nestjs/microservices';

export default registerAs('app', () => ({
    env: process.env.APP_ENV || 'local',
    http: {
        host: process.env.HTTP_HOST || 'localhost',
        port: +process.env.HTTP_PORT || 3000,
    },
    grpc: addReflectionToGrpcConfig({
        transport: Transport.GRPC,
        options: {
            package: ['sample'],
            protoPath: [resolve('proto/sample/sample.proto')],
            url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
            loader: {
                oneofs: true,
                keepCase: true,
            },
        },
    }),
    kafka: {
        brokers: process.env.KAFKA_BROKERS.split(','),
        consumer: {
            groupId: 'my-app',
        },
        schemaRegistry: {
            host: process.env.SCHEMA_REGISTRY_HOST,
        },
    },
}));
