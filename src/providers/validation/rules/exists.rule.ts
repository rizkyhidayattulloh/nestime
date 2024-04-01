import { ExtendedPrismaClient } from '@/providers/database/prisma/prisma.extension';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { CustomPrismaService } from 'nestjs-prisma';
import { PRISMA_SERVICE } from '@/providers/database/prisma/prisma.constant';

@Injectable()
@ValidatorConstraint({ name: 'IsExists', async: true })
export class IsExists implements ValidatorConstraintInterface {
    constructor(
        @Inject(PRISMA_SERVICE)
        private readonly prisma: CustomPrismaService<ExtendedPrismaClient>,
    ) {}

    async validate(
        value: any,
        validationArguments?: ValidationArguments,
    ): Promise<boolean> {
        const [table, column] = validationArguments.constraints;
        const query = `SELECT * FROM ${table} WHERE ${column} = ${value} LIMIT 1`;
        const [result]: Array<any> = await this.prisma.client
            .$queryRaw`${Prisma.raw(query)}`;

        return result && !result['deleted_at'];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    defaultMessage(validationArguments?: ValidationArguments): string {
        return `Invalid ${validationArguments.property}`;
    }
}
