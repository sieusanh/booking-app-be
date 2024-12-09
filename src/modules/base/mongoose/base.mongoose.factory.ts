import { BaseModel, BaseDto } from 'modules/base';

export class DataModelFactory<
    Dto extends BaseDto,
    Model extends BaseModel
> {

    convertDtoToModel(dto: Dto): Model {

        const model: Model = {} as Model;

        for (const [key, val] of Object.entries(dto)) {
            model[key] = val;
        }

        return model;
    }

    convertModelToDto(Model: Model): Dto {

        const dto: Dto = {} as Dto;

        for (const [key, val] of Object.entries(Model)) {
            dto[key] = val;
        }

        return dto;
    }

    convertModelsToDtos(models: Model[]): Dto[] {

        const dtos: Dto[] = [] as Dto[];

        for (const model of models) {
            const dto: Dto = {} as Dto;

            for (const [key, val] of Object.entries(model)) {
                dto[key] = val;
            }
            dtos.push(dto);
        }

        return dtos;
    }
}
