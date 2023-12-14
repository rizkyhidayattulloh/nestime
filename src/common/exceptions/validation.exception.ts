import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends UnprocessableEntityException {
    constructor(public errors: ValidationError[]) {
        const validationErrors = {};

        errors.forEach((error) => {
            validationErrors[error.property] = Object.values(
                error.constraints,
            )[0];
        });

        super({
            status_code: HttpStatus.UNPROCESSABLE_ENTITY,
            message: 'Validation Error',
            errors: validationErrors,
        });
    }
}
