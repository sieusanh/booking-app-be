import { Injectable, PipeTransform, 
    ArgumentMetadata, BadRequestException 
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationPipeOptions } from './interface.pipe';

// @Injectable()
// export class ValidationPipe implements PipeTransform {
//     transform(value: any, metadata: ArgumentMetadata) {
//         return value;
//     }
// }

@Injectable()
export class ValidationPipe implements PipeTransform<any> {

    constructor(private options: ValidationPipeOptions) {}

    async transform(value: any, { metatype }: ArgumentMetadata) {
        console.log('============ err ValidationPipe transform value ', value)

        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        console.log('============ loigiz value ', errors)
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
