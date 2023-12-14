import { DemoScheduler } from '@/cmd/schedulers/demo.scheduler';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [DemoScheduler],
})
export class SchedulerProvider {}
