
import { IsNumberString, IsString, IsNotEmpty } from 'class-validator';
import { ID } from 'src/common';

export class PathParams {

    @IsString()
    @IsNotEmpty()
    id?: ID;
    
}
