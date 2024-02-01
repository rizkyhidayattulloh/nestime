import { Module } from '@nestjs/common';
import { SampleController } from '@/app/kafka/handlers/sample/sample.controller';

@Module({
    controllers: [SampleController],
})
export class KafkaModule {}
