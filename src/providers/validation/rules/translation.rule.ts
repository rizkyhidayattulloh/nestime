import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
@ValidatorConstraint({ name: 'HasFallbackLocale', async: true })
export class TranslationRule implements ValidatorConstraintInterface {
    constructor(private readonly configService: ConfigService) {}

    async validate(value: { locale: string }[]): Promise<boolean> {
        const fallbackLanguage = this.configService.get(
            'translation.fallbackLanguage',
        );
        const res = value.some((item) => item.locale === fallbackLanguage);

        console.log(res);

        return res;
    }

    defaultMessage(): string {
        const fallbackLanguage = this.configService.get(
            'translation.fallbackLanguage',
        );
        return `Missing ${fallbackLanguage} translation`;
    }
}
