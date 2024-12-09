import { Injectable } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseDto, BaseEntity } from 'src/modules/base';

@Injectable()
export class ModelFactory<
    Dto extends BaseDto, 
    Entity extends BaseEntity
> {
    // private dto?: Dto;
    // private model?: Model;
    // private entity?: Entity;

    // constructor(dto: Dto, model: Model, entity: Entity) {
    //     this.dto = dto;
    //     this.model = model;
    //     this.entity = entity;
    // }

    // constructor(
    //     private dto?: Dto,
    //     private entity?: Entity
    // ) {}

    // setDto(dto: Dto) {
    //     if (dto) {
    //         this.dto = dto;
    //     }
    // }

    // setEntity(entity: Entity) {
    //     if (entity) {
    //         this.entity = entity;
    //     }
    // }

    convertDtoToEntity(dto: Dto): Entity {

        const entity: Entity = {} as Entity;

        for (const key of Object.keys(dto)) {
            entity[key] = dto[key];
        }

        return entity;
    }

    convertEntityToDto(entity: Entity): Dto {

        const dto: Dto = {} as Dto;

        for (const key of Object.keys(dto)) {
            dto[key] = entity[key];
        }

        return dto;
    }

    convertEntitiesToDtos(entities: Entity[]): Dto[] {

        const dtos: Dto[] = [] as Dto[];

        for (const entity of entities) {
            for (const [key, val] of Object.entries(entity)) {
                dtos[key] = val;
            }
        }

        return dtos;
    }

    // convertDtoToPartialEntity(): QueryDeepPartialEntity<Entity> | null {
    //     if (!this.entity || !this.dto) {
    //         return null;
    //     }
    //     const entity = Object.assign(this.entity, this.dto);
    //     const partialEntity: QueryDeepPartialEntity<Entity> 
    //         = entity as QueryDeepPartialEntity<Entity>;
        
    //     return partialEntity;
    // }

}
