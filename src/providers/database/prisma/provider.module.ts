import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from '@/providers/database/prisma/prisma.extension';
import { PRISMA_SERVICE } from '@/providers/database/prisma/prisma.constant';

@Module({
    imports: [
        CustomPrismaModule.forRootAsync({
            name: PRISMA_SERVICE,
            isGlobal: true,
            useFactory: () => {
                return extendedPrismaClient;
            },
        }),
    ],
})
export class PrismaProviderModule {}
