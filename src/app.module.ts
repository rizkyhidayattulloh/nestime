import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import 'winston-daily-rotate-file';
import { HttpModule } from '@/app/http/http.module';
import { ProviderModule } from '@/providers/provider.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: config,
        }),
        ProviderModule,
        // register you app layer modules here
        HttpModule,
    ],
})
export class AppModule {}
