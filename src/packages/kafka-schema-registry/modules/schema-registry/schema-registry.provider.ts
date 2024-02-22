import { COMPATIBILITY } from '@kafkajs/confluent-schema-registry';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchemaRegistryClient } from '@/packages/kafka-schema-registry/modules/schema-registry/schema-registry.client';
import {
    SchemaRegistryConfig,
    SchemaRegistrySchema,
} from '@/packages/kafka-schema-registry/modules/schema-registry/schema-registry.interface';
import { SCHEMA_REGISTRY_CONFIG } from '@/packages/kafka-schema-registry/constants';

@Injectable()
export class SchemaRegistryProvider implements OnModuleInit {
    private readonly logger = new Logger(SchemaRegistryProvider.name);
    private readonly schemas: SchemaRegistrySchema[];

    constructor(
        private schemaRegistry: SchemaRegistryClient,
        @Inject(SCHEMA_REGISTRY_CONFIG)
        private config: SchemaRegistryConfig,
    ) {
        this.schemas = config.schemas;
    }

    async onModuleInit(): Promise<void> {
        await Promise.all(
            this.schemas.map(async (schema) => await this.register(schema)),
        );
    }

    private async register(config: SchemaRegistrySchema) {
        const { value: schema, subject: topic } = config;
        const subject = `${topic}-value`;

        try {
            const { id } = await this.schemaRegistry.register(schema, {
                subject,
                compatibility: COMPATIBILITY.NONE,
            });
            this.logger.log(`Registered schema for ${subject} with id ${id}`);
        } catch (error) {
            this.logger.error(
                `Failed to register schema for ${subject}`,
                error.stack,
            );
        }
    }
}
