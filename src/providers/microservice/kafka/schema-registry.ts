import { SchemaType } from '@kafkajs/confluent-schema-registry';
import { SchemaRegistrySchema } from '@/packages/kafka-schema-registry';
import { join } from 'path';
import { SampleTopic } from '@/providers/microservice/kafka/enums/topic.enum';

export const schemas: SchemaRegistrySchema[] = [
    {
        value: {
            schema: join(
                __dirname,
                'schema-registry/sample/sample.schema.avsc',
            ),
            type: SchemaType.AVRO,
        },
        subject: SampleTopic.CREATE,
    },
];
