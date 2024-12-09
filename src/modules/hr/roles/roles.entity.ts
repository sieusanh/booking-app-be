import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'modules/base';
import { ROLES } from 'src/common';

@Entity({
    name: 'hr_roles'
})
export class Role extends BaseEntity {

    @Column({
        unique: true
    })
    title: string;

    @Column({
        type: 'enum',
        enum: ROLES,
        array: true,
        default: [ROLES.MEMBER],
    })
    actions: Array<ROLES>;
}
