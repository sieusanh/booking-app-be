import { Injectable } from '@nestjs/common';
import { HotelDto } from './hotels.dto';
import { Hotel } from './hotels.model';
import { HotelsRepository } from './hotels.repository';
import { DataModelFactory } from 'modules/base';
import { ICriteria, ISelect, IFilter, ID } from 'common/constant';
import { IFindModelsResult, IFindDtosResult } from 'modules/base';

@Injectable()
export class HotelsService {

    constructor(
        protected repository: HotelsRepository,

        protected dataModelFactory: 
            DataModelFactory<HotelDto, Hotel>,

    ) { }

    async insertOne(hotelDto: HotelDto) {
        try {
            const hotelEntity: Hotel
                = this.dataModelFactory.convertDtoToModel(hotelDto);

            const newModel 
                = await this.repository.insertOne(hotelEntity);

            const resDto: HotelDto 
                = this.dataModelFactory.convertModelToDto(newModel);

            return resDto;
        } catch (err) {
            throw err;
        }
    }

    async findById(id: ID): Promise<HotelDto | null> {
        try {
  
            const hotelModel = await this.repository.findById(id);

            if (!hotelModel || !Object.keys(hotelModel).length) {
                return null;
            }

            const resDto: HotelDto 
                = this.dataModelFactory.convertModelToDto(hotelModel);

            return resDto;
        } catch (err) {
            throw err;
        }
    }

    async findOne(filters: IFilter[], select?: ISelect): 
        Promise<HotelDto | null> {
        try {
  
            const hotelModel = await this.repository.findOne(
                { select, filters }
            );
            
            if (!hotelModel || !Object.keys(hotelModel).length) {
                return null;
            }

            const resDto: HotelDto 
                = this.dataModelFactory.convertModelToDto(hotelModel);
            
            return resDto;
    
        } catch (err) {
            throw err;
        }
    }

    async findMany(criteria: ICriteria) {
    // Promise<IFindDtosResult<HotelDto>> {
        try {
            const findModelsResult: IFindModelsResult<Hotel> 
                = await this.repository.findMany(criteria);

            if (!findModelsResult || 
                !findModelsResult.data.length || 
                !findModelsResult.total) {

                const defaultResult = { data: [], total: 0 };
                return defaultResult;
            } 
            
            const { data: entities, total }: IFindModelsResult<Hotel> 
                = findModelsResult;

            // Convert Entity to Dto
            const resDtos: HotelDto[] 
                = this.dataModelFactory.convertModelsToDtos(entities);

            const findManyDtosResult: IFindDtosResult<HotelDto> 
                = { data: resDtos, total };
            
            return findManyDtosResult;
        } catch (err) {
            throw err;
        }
    }

    async countByCity(criteria: ICriteria) {
        // const { filters } = criteria;

        const findModelsResult: IFindModelsResult<Hotel> 
                = await this.repository.findMany(criteria);

        const identityKey = 'city';
        await this.repository.groupBy(criteria, identityKey);
    }

    // async updateById(
    //     id: ID, 
    //     hotelDto: HotelDto
    // ) {
    //     try {
    //         const model: Hotel 
    //         = this.dataModelFactory.convertDtoToModel(hotelDto);

    //         await this.repository.updateById(id, model);

    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // async deleteById(id: ID) {
    //     try {
            
    //         await this.repository.deleteById(id);

    //     } catch (err) {
    //         throw err;
    //     }
    // }




/*
    async createMany(entities: Dto[]): Promise<void> {
        const func = async function () {
            await this.queryRunnerFactory.save(entities[0]);
            await this.queryRunnerFactory.save(entities[1]);
        }
        await this.queryRunnerFactory.wrapTransaction(func);
    }

    updateMany(
        FindManyOptions
        criteria: FindOptionsWhere<Dto>, 
        dto: Dto
    ): Promise<UpdateResult> {
        const partialDto: QueryDeepPartialDto<Dto> 
            = dto as QueryDeepPartialDto<Dto>; 

        const result = this.repository
            .update(criteria, partialDto)
            .then(res => res)
            .catch(err => err);
        return result; 
    }
*/

}
