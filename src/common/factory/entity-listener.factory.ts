import { 
    DataSource, 
    EntitySubscriberInterface, 
    EventSubscriber, InsertEvent
} from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { BaseEntity } from 'src/modules/base';


@EventSubscriber()
export class EntityListenerService<Entity extends BaseEntity, DataSource> // UserSubscriber
implements EntitySubscriberInterface {

    // @InjectDataSource()
    // protected dataSource: DataSource;

    constructor(
        private dataSource: DataSource
    ) {

        // this.dataSource.subscribers.push(this);
    }

    listenTo() {
        return BaseEntity;
    }

    beforeInsert(event: InsertEvent<Entity>) {
        console.log(`BEFORE USER INSERTED: `, event.entity);
    }
}