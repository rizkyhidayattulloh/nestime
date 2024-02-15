import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends UnprocessableEntityException {
    constructor(public errors: ValidationError[]) {
        const validationErrors = new Map<string, string>();

        errors.forEach((error) => {
            if (error.constraints) {
                Object.entries(error.constraints).forEach(([_, value]) => {
                    validationErrors.set(error.property, value as string);
                });
            }

            error.children.forEach((child) => {
                [child, ...child.children].forEach((item) => {
                    if (item.constraints) {
                        Object.entries(item.constraints).forEach(
                            ([_, value]) => {
                                let prop = `${error.property}.${child.property}`;

                                if (child.property !== item.property) {
                                    prop += `.${item.property}`;
                                }

                                validationErrors.set(prop, value as string);
                            },
                        );
                    }
                });
            });
        });

        super({
            status_code: HttpStatus.UNPROCESSABLE_ENTITY,
            message: 'Validation Error',
            errors: Object.fromEntries(validationErrors),
        });
    }
}
