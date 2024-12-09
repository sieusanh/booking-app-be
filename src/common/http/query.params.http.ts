import { ApiProperty } from '@nestjs/swagger';

export class QueryParams {

    where?: any

    @ApiProperty({
        default: ''
    })
    fields?: string;

    // [key]: unknown;

    @ApiProperty({
        default: 0
    })
    offset?: number = 0;
    
    @ApiProperty({
        default: 20
    })
    limit?: number = 20;

    @ApiProperty({
        // default: 20
        required: false
    })
    sort_by?: string;

    @ApiProperty({
        required: false,
        default: 'asc'
    })
    sort_direction?: string;
}
