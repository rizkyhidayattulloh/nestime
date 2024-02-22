import { Inject, Injectable } from '@nestjs/common';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { SCHEMA_REGISTRY_CONFIG } from '@/packages/kafka-schema-registry/constants';
import { SchemaRegistryConfig } from '@/packages/kafka-schema-registry/modules/schema-registry/schema-registry.interface';

@Injectable()
export class SchemaRegistryClient extends SchemaRegistry {
    constructor(
        @Inject(SCHEMA_REGISTRY_CONFIG)
        private readonly config: SchemaRegistryConfig,
    ) {
        const { args, options } = config;
        super(args, options);
    }
}
