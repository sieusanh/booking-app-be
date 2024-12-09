import { BaseEntity } from './base.typeorm.entity';
import { ID } from 'src/common';
import { FindManyOptions, FindOneOptions, 
    InsertResult, UpdateResult, DeleteResult } from 'typeorm';

export interface IFindEntitiesResult<Entity extends BaseEntity>  {
    data: Entity[];
    total: number;
}

export interface IBaseRepository<Entity extends BaseEntity> {

    insertOne(entity: Entity): Promise<Entity>;

    insertMany(entities: Entity[]): Promise<InsertResult>;

    findById(id: ID): Promise<Entity>;

    findOne(options: FindOneOptions<Entity>): Promise<Entity>;

    findMany(options: FindManyOptions<Entity>): 
        Promise<IFindEntitiesResult<Entity>>;

    updateById(id: ID, entity: Entity): Promise<UpdateResult>;
    
    deleteById(id: ID): Promise<DeleteResult>
        
}
