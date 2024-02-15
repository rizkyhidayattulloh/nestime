import { Inject, Injectable } from '@nestjs/common';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { SCHEMA_REGISTRY_CONFIG } from '@/packages/kafka-schema-registry/common/constants';
import { SchemaRegistryConfig } from '@/packages/kafka-schema-registry/common/interfaces';

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
