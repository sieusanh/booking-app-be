import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

type ApiBodyObj = { description?: string, examples?: {}};

export function BaseApiBody({ description, examples }: ApiBodyObj) {
    return applyDecorators(
        ApiBody({
            description, 
            examples
        })
    );
}
