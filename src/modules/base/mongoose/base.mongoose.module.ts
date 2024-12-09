import { Module, Global } from '@nestjs/common';
import { DataModelFactory } from './base.mongoose.factory';

@Global()
@Module({
    providers: [
        DataModelFactory
    ],
    exports: [
        DataModelFactory
    ]
})
export class BaseMongooseModule {};
