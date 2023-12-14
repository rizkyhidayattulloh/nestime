import { Module } from '@nestjs/common';
import { HelloController } from './controllers/hello.controller';
import { UserModule } from '@/modules/user/user.module';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { Partitioners } from 'kafkajs';
// import { ConfigService } from '@nestjs/config';
// import { resolve } from 'path';

@Module({
    imports: [
        UserModule,
        // ClientsModule.registerAsync({
        //     clients: [
        //         {
        //             inject: [ConfigService],
        //             name: 'KAFKA_SERVICE',
        //             useFactory: (config: ConfigService) => ({
        //                 transport: Transport.KAFKA,
        //                 options: {
        //                     client: {
        //                         brokers: [
        //                             `${config.get(
        //                                 'app.kafka.host',
        //                             )}:${config.get('app.kafka.port')}`,
        //                         ],
        //                     },
        //                     consumer: {
        //                         groupId: 'my-app',
        //                         allowAutoTopicCreation: true,
        //                     },
        //                     producer: {
        //                         createPartitioner:
        //                             Partitioners.LegacyPartitioner,
        //                     },
        //                 },
        //             }),
        //         },
        //     ],
        // }),
        // ClientsModule.registerAsync({
        //     clients: [
        //         {
        //             name: 'GRPC_SERVICE',
        //             inject: [ConfigService],
        //             useFactory: (config: ConfigService) => ({
        //                 transport: Transport.GRPC,
        //                 options: {
        //                     package: ['user'],
        //                     protoPath: [resolve('proto/user/user.proto')],
        //                     url: `${config.get('app.grpc.host')}:${config.get(
        //                         'app.grpc.port',
        //                     )}`,
        //                 },
        //             }),
        //         },
        //     ],
        // }),
    ],
    controllers: [HelloController],
})
export class HttpModule {}
