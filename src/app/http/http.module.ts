import { Module } from '@nestjs/common';
import { SampleController } from '@/app/http/handlers/sample/sample.controller';
import { SampleModule } from '@/modules/sample/sample.module';

@Module({
    imports: [SampleModule],
    controllers: [SampleController],
})
export class HttpModule {}
