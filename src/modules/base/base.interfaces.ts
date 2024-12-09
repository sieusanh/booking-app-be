import { BaseDto } from './base.dto';

export interface IFindDtosResult<Dto extends BaseDto>  {
    data: Dto[];
    total: number;
}
