import { 
    DataSource, 
    EntitySubscriberInterface, 
    EventSubscriber, InsertEvent
} from 'typeorm';
import { BaseEntity } from './base.typeorm.entity';

@EventSubscriber()
export class BaseSubscriber implements EntitySubscriberInterface<BaseEntity> {
    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return BaseEntity;
    }

    beforeInsert(event: InsertEvent<BaseEntity>) {
        console.log(`BEFORE USER INSERTED: `, event.entity);
    }
}
