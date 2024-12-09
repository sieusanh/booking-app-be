import { Module, Global } from '@nestjs/common';
import { DataFactory } from './data.factory';

@Global()
@Module({
    providers: [
        DataFactory
    ],
    exports: [
        DataFactory
    ]
})
export class FactoryModule {};
