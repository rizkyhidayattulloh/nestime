import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [
        BullModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.get('bull'),
        }),
        BullModule.registerQueue({
            name: 'demo',
        }),
    ],
    providers: [],
    exports: [BullModule],
})
export class QueueProvider {}
