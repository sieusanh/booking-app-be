import { Injectable } from '@nestjs/common';
import { BaseTypeormRepository } from 'modules/base';
import { Account } from './accounts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsRepository extends BaseTypeormRepository<Account> {

    constructor(
        @InjectRepository(Account)
        protected repository: Repository<Account>,
    ) {
        super(repository);
    }

    getAccounts(): Promise<any> {
        const p = new Promise((resolve) => 
            resolve('nothing'));
        return p;
    }
}
