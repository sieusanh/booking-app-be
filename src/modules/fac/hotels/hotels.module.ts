import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { HotelsRepository } from './hotels.repository';
import { SCHEMA_NAME } from './hotels.constant';
import { DataModelFactory } from 'modules/base';
import { QueryParser } from 'common/http';
import { HotelSchema } from './hotels.schema';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{ 
            name: SCHEMA_NAME, 
            schema: HotelSchema,
        }]),
    ],
    controllers: [HotelsController],
    providers: [    
        HotelsRepository,
        HotelsService, 
        DataModelFactory,
        QueryParser
    ],
    exports: [
        HotelsService,
        HotelsRepository,
    ]
})
export class HotelsModule {}
