import { IsString, IsDate, IsOptional } from 'class-validator';
import { ID } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
    
    @IsString()
    @IsOptional()
    @ApiProperty({
        type: 'string'
    })
    id: ID = '';
    
    // @IsInt()
    // @IsOptional()
    // @IsEnum(STATUS)
    // @ApiProperty({ enum: Object.keys(STATUS) })
    // status: number = 1;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    createdAt: Date = new Date();

    @IsDate()
    @IsOptional()
    @ApiProperty()
    updatedAt: Date = new Date();

    @IsString()
    @IsOptional()
    @ApiProperty()
    createdBy: string = '';

    @IsString()
    @IsOptional()
    @ApiProperty()
    updatedBy: string = '';
}   
