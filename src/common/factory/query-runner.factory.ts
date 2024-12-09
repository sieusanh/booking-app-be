import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BaseEntity } from 'src/modules/base';


// @Injectable()
export class QueryRunnerService<Entity extends BaseEntity> {
    @InjectDataSource()
    // protected dataSource: DataSource;
    
    protected queryRunner;

    constructor(
        private dataSource: DataSource
    ) {
        // this.queryRunner = this.dataSource.createQueryRunner(); 
    }

    save(entities: Entity[]) {
        return this.queryRunner.manager.save(entities);
    }

    async wrapTransaction(bodyFunc: () => Promise<void>) {
        if (!this.queryRunner) {
            throw new InternalServerErrorException('QueryRunner is undefined');
        }
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
        try {
            // await this.queryRunner.manager.save(entities[0]);
            // await this.queryRunner.manager.save(entities[1]);
            await bodyFunc;

            await this.queryRunner.commitTransaction();
        } catch (err) {
            if (this.queryRunner) {
                // since we have errors lets rollback the changes we made
                await this.queryRunner.rollbackTransaction();
            }
        } finally {
            if (this.queryRunner) {
                // you need to release a queryRunner which was manually instantiated
                await this.queryRunner.release();
            }
        }
    }
}