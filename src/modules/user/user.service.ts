import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async users(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async store(): Promise<void> {
        await this.prisma.user.create({
            data: {
                email: 'rizky@timedoor.net',
                name: 'rizky',
            },
        });
    }
}
