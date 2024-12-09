import { Module, Global } from '@nestjs/common';
import { DataEntityFactory } from './base.typeorm.factory';

@Global()
@Module({
    providers: [
        DataEntityFactory
    ],
    exports: [
        DataEntityFactory
    ]
})
export class BaseTypeormModule {};
