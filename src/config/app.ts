import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    env: process.env.APP_ENV || 'local',
    http: {
        host: process.env.HTTP_HOST || 'localhost',
        port: +process.env.HTTP_PORT || 3000,
    },
    grpc: {
        host: process.env.GRPC_HOST || 'localhost',
        port: +process.env.GRPC_PORT || 5000,
    },
    kafka: {
        host: process.env.KAFKA_HOST || 'localhost',
        port: +process.env.KAFKA_PORT || 3000,
    },
}));
