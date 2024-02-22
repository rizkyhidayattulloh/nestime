import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Partitioners } from 'kafkajs';
import {
    KAFKA_REGISTRY_CONFIG,
    KafkaService,
    SchemaRegistryClient,
    SchemaRegistryModule,
} from '@/packages/kafka-schema-registry';
import { schemas } from '@/providers/microservice/kafka/schema-registry';
import { readAVSCAsync } from '@kafkajs/confluent-schema-registry';
import { KafkaRegistryProvider } from '@/packages/kafka-schema-registry/modules/kafka-registry/kafka-registry.provider';
import { topics } from '@/providers/microservice/kafka/topic-registry';

@Module({
    imports: [
        SchemaRegistryModule.registerAsync({
            isGlobal: true,
            useFactory: async (config: ConfigService) => {
                const avroSchemas = await Promise.all(
                    schemas.map(async (schema) => {
                        const avroSchema = JSON.stringify(
                            await readAVSCAsync(schema.value.schema as string),
                        );

                        return {
                            subject: schema.subject,
                            value: {
                                schema: avroSchema,
                                type: schema.value.type,
                            },
                        };
                    }),
                );
                return {
                    schemas: avroSchemas,
                    args: {
                        host: config.get('app.kafka.schemaRegistry.host'),
                    },
                };
            },
            inject: [ConfigService],
        }),
        ClientsModule.registerAsync({
            isGlobal: true,
            clients: [
                {
                    inject: [ConfigService, SchemaRegistryClient],
                    name: KafkaService.name,
                    useFactory: (
                        config: ConfigService,
                        schemaRegistry: SchemaRegistryClient,
                    ) => ({
                        customClass: KafkaService,
                        transport: Transport.KAFKA,
                        options: {
                            schemaRegistry,
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
    ],
    providers: [
        {
            provide: KAFKA_REGISTRY_CONFIG,
            useValue: {
                topics,
            },
        },
        KafkaRegistryProvider,
    ],
})
export class KafkaProviderModule {}
