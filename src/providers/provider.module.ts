import { Module } from '@nestjs/common';
import { KafkaProviderModule } from '@/providers/microservice/kafka/provider.module';
import { BullProviderModule } from '@/providers/queue/bull/provider.module';
import { WinstonProviderModule } from '@/providers/logger/winston/provider.module';
import { SchedulerProviderModule } from '@/providers/scheduler/provider.module';
import { PrismaProviderModule } from '@/providers/database/prisma/provider.module';
import { ValidationProviderModule } from '@/providers/validation/provider.module';

@Module({
    imports: [
        PrismaProviderModule,
        KafkaProviderModule,
        BullProviderModule,
        ProviderModule,
        WinstonProviderModule,
        SchedulerProviderModule,
        ValidationProviderModule,
    ],
})
export class ProviderModule {}
