import { Module } from '@nestjs/common';
import { HttpV1Module } from '@/app/http/v1/http.v1.module';

@Module({
    imports: [HttpV1Module],
})
export class HttpModule {}
