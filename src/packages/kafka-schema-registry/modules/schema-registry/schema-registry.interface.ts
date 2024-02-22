import {
    ConfluentSchema,
    SchemaRegistryAPIClientOptions,
} from '@kafkajs/confluent-schema-registry/dist/@types';
import { SchemaRegistryAPIClientArgs } from '@kafkajs/confluent-schema-registry/dist/api';
import { ModuleMetadata } from '@nestjs/common';

export interface SchemaRegistrySchema {
    subject: string;
    value?: ConfluentSchema;
}

export interface SchemaRegistryConfig {
    schemas: SchemaRegistrySchema[];
    args: SchemaRegistryAPIClientArgs;
    options?: SchemaRegistryAPIClientOptions;
}

export interface SchemaRegistryModuleOptions {
    client: SchemaRegistryConfig;
    isGlobal?: boolean;
}

export interface SchemaRegistryModuleAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (
        ...args: any[]
    ) => SchemaRegistryConfig | Promise<SchemaRegistryConfig>;
    inject?: any[];
    isGlobal?: boolean;
}
