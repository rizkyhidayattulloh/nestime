import { Module } from '@nestjs/common';
import { SampleService } from '@/modules/sample/sample.service';

@Module({
    exports: [SampleService],
    providers: [SampleService],
})
export class SampleModule {}
