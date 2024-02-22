import { ITopicConfig } from 'kafkajs';
import { SampleTopic } from '@/providers/microservice/kafka/enums/topic.enum';

export const topics: ITopicConfig[] = [
    {
        topic: SampleTopic.CREATE,
        numPartitions: 1,
        replicationFactor: 1,
    },
];
