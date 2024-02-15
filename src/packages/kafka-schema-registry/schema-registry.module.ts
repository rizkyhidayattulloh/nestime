import { DynamicModule, Module } from '@nestjs/common';
import { SchemaRegistryProvider } from '@/packages/kafka-schema-registry/schema-registry.provider';
import { SchemaRegistryClient } from '@/packages/kafka-schema-registry/schema-registry.client';
import {
    SchemaRegistryModuleAsyncOptions,
    SchemaRegistryModuleOptions,
} from '@/packages/kafka-schema-registry/common/interfaces';
import { SCHEMA_REGISTRY_CONFIG } from '@/packages/kafka-schema-registry/common/constants';

@Module({})
export class SchemaRegistryModule {
    static register(options: SchemaRegistryModuleOptions): DynamicModule {
        return {
            global: options.isGlobal,
            module: SchemaRegistryModule,
            providers: [
                {
                    provide: SCHEMA_REGISTRY_CONFIG,
                    useValue: options.client,
                },
                SchemaRegistryClient,
                SchemaRegistryProvider,
            ],
            exports: [SchemaRegistryClient],
        };
    }

    static registerAsync(
        options: SchemaRegistryModuleAsyncOptions,
    ): DynamicModule {
        return {
            global: options.isGlobal,
            module: SchemaRegistryModule,
            providers: [
                {
                    provide: SCHEMA_REGISTRY_CONFIG,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                SchemaRegistryClient,
                SchemaRegistryProvider,
            ],
            exports: [SchemaRegistryClient],
        };
    }
}
