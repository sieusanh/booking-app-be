import { Module, Global } from '@nestjs/common';
import { QueryParser } from './query.parser.http';

@Global()
@Module({
    providers: [
        QueryParser
    ],
    exports: [
        QueryParser
    ]
})
export class HttpModule {};
