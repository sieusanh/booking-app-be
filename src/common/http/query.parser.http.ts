// import { EntityListenerService } from './entity-listener.factory';
// import { QueryRunnerService } from './query-runner.factory';
import { QueryParams } from './query.params.http';
import { FindOneOptions } from 'typeorm';
import queryString from 'querystring';

import { ICriteria, IFilter, ISelect } from 'common/constant';

// @Global()
// @Module({
//     exports: [
//         EntityListenerService, 
//         QueryRunnerService
//     ]
// })
// export class ModuleFactory { 

// }

export class QueryParser {
    parseFindOneQuery(queryParams: QueryParams): FindOneOptions {
        const findOneOptions: FindOneOptions = {};
        console.log('=============** queryParams ', queryParams)
        console.log('=============** findOneOptions ', findOneOptions)

        return findOneOptions;
    }

    parseFindManyQuery(queryParams: QueryParams): ICriteria {

        const { offset, limit, fields, ...others } = queryParams;

        const criteria: ICriteria = {};
        const filters: IFilter[] = [];
        const select: ISelect = [];

        if (offset) {
            Object.assign(criteria, offset);
        }

        if (limit) {
            Object.assign(criteria, limit);
        }

        if (others && Object.entries(others).length) {
            for (const [key, val] of Object.entries(others)) {
                const pair = { [key]: val };
                filters.push(pair);
            }
            Object.assign(criteria, filters);
        }

        if (fields) {
            fields.split(',').forEach(
                (field: string) => select.push(field)
            ); 
            Object.assign(criteria, fields);
        }

        return criteria;
    }

}
