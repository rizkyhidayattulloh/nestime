import { Module } from '@nestjs/common';
import { IsExists } from './rules/exists.rule';

@Module({
    providers: [IsExists],
})
export class ValidationModule {}
