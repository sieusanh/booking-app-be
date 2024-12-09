import { Injectable } from '@nestjs/common';
import { BaseMongooseRepository } from 'modules/base';
import { Hotel } from './hotels.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongooseModel } from 'mongoose';
import { SCHEMA_NAME } from './hotels.constant';

@Injectable()
export class HotelsRepository extends BaseMongooseRepository<Hotel> {

    constructor(
        @InjectModel(SCHEMA_NAME)
        protected model: MongooseModel<Hotel>,
    ) {
        super(model);
    }

    getHotels(): Promise<any> {
        const p = new Promise((resolve) => 
            resolve('nothing'));
        return p;
    }
}
