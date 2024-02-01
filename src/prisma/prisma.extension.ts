import { PrismaClient } from '@prisma/client';
import { pagination } from 'prisma-extension-pagination';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';

export const extendedPrismaClient = new PrismaClient()
    .$extends(
        createSoftDeleteExtension({
            models: {},
            defaultConfig: {
                field: 'deletedAt',
                createValue: (deleted) => {
                    if (deleted) return new Date();
                    return null;
                },
            },
        }),
    )
    .$extends(pagination());

export type ExtendedPrismaClient = typeof extendedPrismaClient;
