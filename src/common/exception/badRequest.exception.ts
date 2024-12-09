import { BadRequestException } from '@nestjs/common';

export class EmptyValueException extends BadRequestException {
    constructor(message: string) {
      super(message);
    }
}

export class MissingFieldException extends BadRequestException {
    constructor(fieldName: string) {
        super(`${fieldName} is required.`);
    }
}

export class InvalidValueException extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}