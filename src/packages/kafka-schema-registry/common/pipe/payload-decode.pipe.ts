import { Inject, Injectable, PipeTransform } from '@nestjs/common';
import { KafkaService } from '@/packages/kafka-schema-registry/kafka.service';

@Injectable()
export class PayloadDecodePipe implements PipeTransform {
    constructor(
        @Inject(KafkaService.name)
        private readonly kafkaService: KafkaService,
    ) {}

    async transform(value: any) {
        return await this.kafkaService.decode(value);
    }
}
