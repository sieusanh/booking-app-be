import { BaseEntity, BaseDto } from 'modules/base';

export class DataEntityFactory<
    Dto extends BaseDto,
    Entity extends BaseEntity
> {

    convertDtoToEntity(dto: Dto): Entity {

        const entity: Entity = {} as Entity;

        for (const [key, val] of Object.entries(dto)) {
            entity[key] = val;
        }

        return entity;
    }

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
