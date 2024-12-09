import { Injectable } from '@nestjs/common';
import { BaseTypeormRepository } from 'modules/base';
import { Role } from './roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesRepository extends BaseTypeormRepository<Role> {

    constructor(
        @InjectRepository(Role)
        protected repository: Repository<Role>,
    ) {
        super(repository);
    }
    
}
