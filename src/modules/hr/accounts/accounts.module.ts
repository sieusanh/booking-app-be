import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { Account } from './accounts.entity';
import { DataEntityFactory } from 'modules/base';
import { QueryParser } from 'common/http';
// import { EntityListenerFactory, QueryRunnerFactory } from 'src/common';
// import { API_BODY_EXAMPLE } from './accounts.constant';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([ Account ]),
        // FactoryModule
    ],
    controllers: [AccountsController],
    providers: [
        AccountsRepository,
        AccountsService, 
        DataEntityFactory,
        QueryParser

        // EntityListenerFactory, QueryRunnerFactory
    ],
    exports: [
        AccountsService,
        AccountsRepository,
        // TypeOrmModule,
    ]
})
export class AccountsModule {}
