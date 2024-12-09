import { BaseEntity } from './base.typeorm.entity';
import { Repository, InsertResult, UpdateResult, DeleteResult,
    FindOneOptions, FindManyOptions, FindOptionsWhere, 
    FindOptionsSelect
} from 'typeorm';

import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IFindEntitiesResult } from './base.typeorm.interfaces';
import { ID } from 'src/common';
import { ICriteria, FILTER_OPERATOR } from 'common/constant';

export class BaseTypeormRepository<Entity extends BaseEntity> 
    // extends Repository<Entity> 

// implements IBaseRepository<Entity> 
{

    // constructor(
    //     protected repoEntity: Entity
    // ) {}
    
    // @InjectRepository(Entity)
    // protected repository: Repository<Entity> ;

    constructor(
        protected repository: Repository<Entity>
    ) {
    }

    // insertOne(entity: Entity): Promise<InsertResult> {
    //     const partialEntity: QueryDeepPartialEntity<Entity> 
    //         = entity as QueryDeepPartialEntity<Entity>;
    //     const data = this
    //         .insert(partialEntity)
    //         .then(res => res.raw[0])
    //         .catch(err => err);
    //     return data;
    // }

    async insertOne(entity: Entity): Promise<Entity> {
        const partialEntity: QueryDeepPartialEntity<Entity> 
            = entity as QueryDeepPartialEntity<Entity>;

        const data = this.repository
            .insert(partialEntity)
            .then(res => res.raw[0]);

        return data;
    }

    insertMany(entities: Entity[]): Promise<InsertResult> {
        const partialEntities: QueryDeepPartialEntity<Entity>[] 
            = [] as QueryDeepPartialEntity<Entity>[];
        for (const entity of entities) {
            const partialEntity: QueryDeepPartialEntity<Entity> 
                = entity as QueryDeepPartialEntity<Entity>;
            partialEntities.push(partialEntity);
        }
        const data = this.repository
            .insert(partialEntities)
            .then(res => res.raw[0])
            .catch(err => err);
        return data;
    }

    findById(id: ID): Promise<Entity> {
        const options: FindOneOptions<Entity> = {
            where: {
              id,
            } as FindOptionsWhere<Entity>,
        };

        // const options: FindOneOptions<Entity> 
        // = this.getFindOptions(criteria);

        const result = this.repository
            .findOne(options)
            .then(res => res)
            .catch(err => err);
        return result;
    }

    // findOne(criteria: ICriteria)
    //     // filter, select, options: FindOneOptions<Entity>
    // : Promise<Entity> {
    //     const { select, filters } = criteria;

    //     const selectOption: FindOptionsSelect<Entity> = Object.fromEntries(
    //         select.map(key => [key, true])
    //     ) as FindOptionsSelect<Entity>;

    //     const whereList: FindOptionsWhere<Entity>[] = [];
    //     for (const filter of filters) {
    //         const { field, operator, value, ...pairs } = filter;
    //         if (field && operator && value) {
    //             if (operator === FILTER_OPERATOR.EQUALS) {
    //                 Object.assign(
    //                     whereList[0], 
    //                     { [field]: value } as 
    //                     FindOptionsWhere<Entity>
    //                 );
    //             } else if (operator === FILTER_OPERATOR.IS) {
    //                 const whereItem: 
    //                     FindOptionsWhere<Entity> = {
    //                         [field]: value
    //                     } as FindOptionsWhere<Entity>; 

    //                 whereList.push(whereItem);
    //             }

    //             continue;
    //         }

    //         for (const [key, value] of Object.entries(pairs)) {
    //             const pair: FindOptionsWhere<Entity> 
    //                 = { [key]: value } as FindOptionsWhere<Entity>; 
    //             whereList.push(pair);
    //         }
            
    //     };    

    //     const options: FindOneOptions<Entity> = {
    //         select: selectOption,
    //         where: whereList
    //     }

    //     const result = this.repository
    //         .findOne(options)
    //         .then(res => res)
    //         .catch(err => err);
    //     return result;
    // }

    getFindOptions(criteria: ICriteria): FindOneOptions<Entity> {
        const { select, filters } = criteria;
        const options: FindOneOptions<Entity> = {};

        if (select) {
            const selectOption: FindOptionsSelect<Entity> = {};
            const selectObj = Object.fromEntries(
                select.map(key => [key, true])
            ) as FindOptionsSelect<Entity>;
            Object.assign(selectOption, selectObj);
            Object.assign(options, {
                select: selectOption
            });
        }

        if (filters && filters.length) {
            const whereList: FindOptionsWhere<Entity>[] = [];

            for (const filter of filters) {
                const whereItem: FindOptionsWhere<Entity> 
                    = filter as FindOptionsWhere<Entity>; 

                whereList.push(whereItem);
            };    
            Object.assign(options, {
                where: whereList
            });
        }

        return options;
    }

    findOne(criteria: ICriteria)
        // filter, select, options: FindOneOptions<Entity>
    : Promise<Entity> {
        
        const options: FindOneOptions<Entity> 
            = this.getFindOptions(criteria);

        const result = this.repository
            .findOne(options)
            .then(res => res)
            .catch(err => err);
        return result;
    }

    async findMany(criteria: ICriteria): Promise<
        IFindEntitiesResult<Entity>
    > {

        const { offset, limit } = criteria;
        let skip: number = 0;
        let take: number = 10;

        if (offset) {
            skip = offset;
        }

        if (limit) {
            take = limit;
        }

        const findOptions: FindOneOptions<Entity> 
            = this.getFindOptions(criteria);
        
        const options: FindManyOptions<Entity> = {
            ...findOptions,
            skip, take
        }

        const result = this.repository.findAndCount(options)
            .then(
                ([data, count]) => ({ data, total: count })
            );

        console.log('================ BaseRepository findMany result ', result)
        
        return result;
    }

    count(criteria: ICriteria): Promise<number> {
        const options: FindOneOptions<Entity> 
            = this.getFindOptions(criteria);

        const result = this.repository
            .count(options)
            .then(res => res)
            .catch(err => err);
        return result;
    }
    
    updateById(id: ID, entity: Entity): Promise<UpdateResult> {

        const findOptionsWhere: FindOptionsWhere<Entity> = { 
            id
        } as FindOptionsWhere<Entity>;

        const partialEntity: QueryDeepPartialEntity<Entity> 
            = entity as QueryDeepPartialEntity<Entity>;
            
        const data: Promise<UpdateResult> = this.repository
            .update(findOptionsWhere, partialEntity)
            .then(res => res.raw[0])
            .catch(err => err);
        return data;
    }

    // updateMany(options, entity: Entity): Promise<void> {

    // }

    deleteById(id: ID): Promise<DeleteResult> {
        const findOptionsWhere: FindOptionsWhere<Entity> = {
            id
        } as FindOptionsWhere<Entity>;

        const result = this.repository.delete(findOptionsWhere)
            .then(res => res)
            .catch(err => err);
        return result;
    }

}
