import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from '@/providers/database/prisma/prisma.extension';

@Module({
    imports: [
        CustomPrismaModule.forRootAsync({
            name: 'PrismaService',
            isGlobal: true,
            useFactory: () => {
                return extendedPrismaClient;
            },
        }),
    ],
})
export class PrismaProviderModule {}
