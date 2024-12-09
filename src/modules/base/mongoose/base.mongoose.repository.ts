import { BaseModel } from './base.mongoose.model';
import { ID } from 'src/common';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Model as MongooseModel, Connection, 
    RootFilterQuery, FilterQuery, QueryOptions, 
    ProjectionType, QueryWithHelpers, UpdateWriteOpResult 
} from 'mongoose';
import { IFindModelsResult } from './base.mongoose.interfaces';
import { ICriteria, IFilter, ISelect } from 'common/constant';
import { PipelineStage, Aggregate } from 'mongoose';

@Injectable()
export class BaseMongooseRepository<Model extends BaseModel> 
    // extends Repository<Model> 

// implements IBaseRepository<Model> 
{

    // constructor(
    //     protected repo Model: Model
    // ) {}
    
    // @InjectRepository(Model)
    // protected repository: Repository<Model> ;

    // private SCHEMA_NAME = this.SCHEMA_NAME;

    @InjectConnection() 
    protected readonly connection: Connection;

    constructor(
        // @InjectModel(SCHEMA_NAME) 
        // private model: MongooseModel<Model>,

        protected model: MongooseModel<Model>

        // protected repository: Repository<Entity>
    ) { }

    async insertOne(newModel: Model): Promise<Model> {
        // const partialEntity: QueryDeepPartialEntity<Entity> 
        //     = entity as QueryDeepPartialEntity<Entity>;

        // const data = this.repository
        //     .insert(partialEntity)
        //     .then(res => res.raw[0]);

        // const data = new this.model(newModel);
        // const result = data.save();
        const result = this.model.create(newModel);

        return result;
    }
/*
    async insertOne(model: Model): Promise<Model> {
        const partialModel: QueryDeepPartialModel<Model> 
            = model as QueryDeepPartialModel<Model>;

        const data = this.repository
            .insert(partialModel)
            .then(res => res.raw[0]);

        return data;
    }
*/

/*
    filter: RootFilterQuery<TRawDocType>,
    projection: ProjectionType<TRawDocType> | null | undefined,
    options: QueryOptions<TRawDocType> & { lean: true }
*/

    getQueryFilter(filters?: IFilter[]): RootFilterQuery<Model> {
        const findFilter: RootFilterQuery<Model> = {};
        
        if (filters && filters.length) {
            const whereList: FilterQuery<Model>[] = [];

            for (const filter of filters) {
                const whereItem: FilterQuery<Model> 
                    = filter as FilterQuery<Model>; 

                whereList.push(whereItem);
            }

            Object.assign(findFilter, {
                $or: whereList
            });
        }

        return findFilter;
    }

    async findMany(criteria: ICriteria): Promise<
        IFindModelsResult<Model>
    > {
        const { select, filters, offset, limit = 10 } = criteria; 
        let skip: number = 0;
        const findProjection: ProjectionType<Model> = {
            _id: 0,
            createdBy: 0,
            updatedBy: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        };
        const findFilter: RootFilterQuery<Model> 
            = this.getQueryFilter(filters);

        const findOptions: QueryOptions<Model> = { lean: true };

        if (select) {
            for (const key of select) {
                Object.assign(findProjection, {
                    [key]: 1
                });
            }
        }

        if (offset) {
            skip = offset;
        }

        Object.assign(findOptions, { skip });
        Object.assign(findOptions, { limit });
        let data: Model[] = [];
        let total = 0;

        [data, total] = await Promise.all([
            this.model.find(
                findFilter, 
                findProjection, 
                findOptions
            ),
            this.model.countDocuments(
                findFilter, 
            )
        ]);

        const result: IFindModelsResult<Model> = {
            data, total
        };

        return result;
    }

    count(criteria: ICriteria): Promise<number> {
        const { filters } = criteria; 
        const findFilter: RootFilterQuery<Model> 
            = this.getQueryFilter(filters);

        const result: QueryWithHelpers<number, Model> 
            = this.model.countDocuments(
                findFilter, 
            );

        return result;
    }

    findOne(criteria: ICriteria) {
        const { select, filters } = criteria; 
        const findProjection: ProjectionType<Model> = {};
        const findFilter: RootFilterQuery<Model> 
            = this.getQueryFilter(filters);
        const findOptions: QueryOptions<Model> = { lean: true };

        if (select) {
            for (const key of select) {
                Object.assign(findProjection, {
                    [key]: 1
                });
            }
        }

        const result: QueryWithHelpers<Model | null, Model> 
            = this.model.findOne(
                findFilter, 
                findProjection, 
                findOptions
            );

        console.log('========================== BaseMongooseRepository findOne result ', 
            result)
        
        return result;
    }

    groupBy(criteria: ICriteria, identityKey: string) {

        const { filters, select } = criteria;

        const groupColumnObj = {};
        const $match = {};
        const findFilter: RootFilterQuery<Model> 
            = this.getQueryFilter(filters);

        if (select) {
            for (const key of select) {
                Object.assign(groupColumnObj, {
                    key: {
                        $first: `$${key}`
                    }
                });
            }
        }

        if (findFilter) {
            Object.assign($match, findFilter);
        }

        const pipelineStages: PipelineStage[] = [
            {
                $match
            },
            {
                $group: {
                    _id: `$${identityKey}`,
                    ...groupColumnObj,
                    total: {
                        $sum: 1
                    }                                                                                   
                }
            }
        ];

        const result
        // : Aggregate<Array<Model>>
            = this.model.aggregate<Model>(
                pipelineStages,
            ).then(res => {

        console.log('========================== BaseMongooseRepository groupBy res ', 
            res)
                return res;
            });

        // console.log('========================== BaseMongooseRepository groupBy result ', 
        //     result)
        
        return result;
    }

    async wrapTransaction(...funcList: Function[]) {
        const session = await this.connection.startSession();
        session.startTransaction();
        for (const func of funcList) {
            func();
        }
        
    }

    // insertOne(Model: Model): Promise<InsertResult> {
    //     const partialModel: QueryDeepPartialModel<Model> 
    //         = Model as QueryDeepPartialModel<Model>;
    //     const data = this
    //         .insert(partialModel)
    //         .then(res => res.raw[0])
    //         .catch(err => err);
    //     return data;
    // }


    // insertMany(models: Model[]): Promise<InsertResult> {
    //     const partialModels: QueryDeepPartialModel<Model>[] 
    //         = [] as QueryDeepPartialModel<Model>[];
    //     for (const model of models) {
    //         const partialModel: QueryDeepPartialModel<Model> 
    //             = model as QueryDeepPartialModel<Model>;
    //         partialModels.push(partialModel);
    //     }
    //     const data = this.repository
    //         .insert(partialModels)
    //         .then(res => res.raw[0])
    //         .catch(err => err);
    //     return data;
    // }

    /*
        filter: RootFilterQuery<TRawDocType>,
        projection: ProjectionType<TRawDocType> | null | undefined,
        options: QueryOptions<TRawDocType> & { lean: true }
    */

    findById(id: ID): Promise<Model> {
        const options: RootFilterQuery<Model> = { code: id };

        const result = this.model        
            .findOne(options)
            .then(res => res)
            .catch(err => err);
        return result;
    }

    // findOne(options: FindOneOptions<Model>): Promise<Model> {

    //     const result = this.repository
    //         .findOne(options)
    //         .then(res => res)
    //         .catch(err => err);
    //     return result;
    // }

    // async findMany(options: FindManyOptions<Model>): Promise<
    // IFindModelsResult<Model>
    // > {
    //     const result = this.repository.findAndCount(options)
    //         .then(([data, count]) => ({data, total: count}))
    //     console.log('================ BaseRepository result ', result)
        
    //     return result;
    // }

    // getUpdateQuery(updateBody: UpdateBody) {

    // }
    
    // updateById(updateFilters: IFilter[], updateBody: UpdateBody, updateOption) {

    //     const updateFilter: RootFilterQuery<Model> = updateFilters;    

    //     const updateQuery: UpdateQuery<Model> = this.getUpdateQuery(updateBody);
            
    //     const data: QueryWithHelpers<UpdateWriteOpResult, Model> 
    //         = this.model
    //         .updateOne(updateFilter, updateQuery)
    //         .then(res => res)
    //         .catch(err => err);
    //     return data;
    // }

    // // updateMany(options, Model: Model): Promise<void> {

    // // }

    // deleteById(id: ID): Promise<QueryWithHelpers<Model, Model>> {
    //     const deleteFilter: RootFilterQuery<Model> 
    //         = { id };
    //     const result: QueryWithHelpers<Model, Model> 
    //         = this.model.deleteOne(
    //             deleteFilter
    //         );
          
    //     return result;
    // }
}
