import { HttpStatus, Module, ValidationPipe } from '@nestjs/common';
import { IsExists } from '@/providers/validation/rules/exists.rule';
import { TranslationRule } from '@/providers/validation/rules/translation.rule';
import { APP_PIPE } from '@nestjs/core';
import { ValidationException } from '@/providers/validation/validation.exception';

const rules = [IsExists, TranslationRule];

@Module({
    providers: [
        ...rules,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                stopAtFirstError: true,
                transform: true,
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                exceptionFactory: (errors) => {
                    return new ValidationException(errors);
                },
            }),
        },
    ],
})
export class ValidationProviderModule {}
