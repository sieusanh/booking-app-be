import { Injectable } from '@nestjs/common';
import { 
    IsString, IsArray, IsNotEmpty, 
    Matches, IsOptional, IsNumber, 
    Max, Min, IsBoolean 
} from 'class-validator';

import { BaseDto } from 'src/modules/base';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class HotelDto extends BaseDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string = '';

    @ApiProperty()
    @IsString()
    @IsOptional()
    type?: string = '';

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Matches(/^[+ 0-9]{8,18}$/)
    phone?: string = '';

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    city: string = '';

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string = '';
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    distance?: string = '';

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    photos?: Array<string>;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title?: string = '';

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    desc: string = '';

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(5) 
    rating: number;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    rooms: Array<string>;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    cheapestPrice: number;

    @ApiProperty()
    @IsBoolean()
    featured: boolean = false;

}
