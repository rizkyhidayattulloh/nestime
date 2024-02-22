import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
    KAFKA_REGISTRY_CONFIG,
    KafkaService,
} from '@/packages/kafka-schema-registry';
import { Admin, ITopicConfig } from 'kafkajs';

@Injectable()
export class KafkaRegistryProvider implements OnModuleInit {
    private adminClient: Admin;

    constructor(
        @Inject(KafkaService.name) private readonly kafkaService: KafkaService,
        @Inject(KAFKA_REGISTRY_CONFIG)
        private readonly config: {
            validateOnly?: boolean;
            waitForLeaders?: boolean;
            timeout?: number;
            topics: ITopicConfig[];
        },
    ) {}

    async onModuleInit() {
        this.adminClient = await this.kafkaService
            .getClient()
            .then((client) => client.admin());
        await this.adminClient.connect();

        const { topics, ...res } = this.config;
        const registeredTopics = await this.adminClient.listTopics();
        const newTopics = topics.filter(
            (topic) => !registeredTopics.includes(topic.topic),
        );

        if (newTopics.length) {
            await this.adminClient.createTopics({
                ...res,
                topics: newTopics,
            });
        }

        await this.adminClient.disconnect();
    }
}
