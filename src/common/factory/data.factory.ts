import { BaseEntity, BaseDto } from 'modules/base';

// @Global()
// @Module({
//     exports: [
//         EntityListenerService, 
//         QueryRunnerService
//     ]
// })
// export class ModuleFactory { 

// }

export class DataFactory<
    Dto extends BaseDto,
    Entity extends BaseEntity
> {

    // Dto to Entity
    convertDtoToEntity(dto: Dto): Entity {

        const entity: Entity = {} as Entity;

        for (const [key, val] of Object.entries(dto)) {
            entity[key] = val;
        }

        return entity;
    }

    // Entity to Dto
    convertEntityToDto(entity: Entity): Dto {

        const dto: Dto = {} as Dto;

        for (const [key, val] of Object.entries(entity)) {
            dto[key] = val;
        }

        return dto;
    }

    convertEntitiesToDtos(entities: Entity[]): Dto[] {

        const dtos: Dto[] = [] as Dto[];

        for (const entity of entities) {
            const dto: Dto = {} as Dto;

            for (const [key, val] of Object.entries(entity)) {
                dto[key] = val;
            }
            dtos.push(dto);
        }

        return dtos;
    }

}
