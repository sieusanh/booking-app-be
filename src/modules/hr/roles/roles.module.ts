import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesRepository } from './roles.repository';
import { Role } from './roles.entity';
// import { EntityListenerFactory, QueryRunnerFactory } from 'src/common';

// import { API_BODY_EXAMPLE } from './Roles.constant';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([ Role ])
    ],
    providers: [
        RolesRepository,
    ],
    exports: [
        RolesRepository,
    ]
})
export class RolesModule {}
