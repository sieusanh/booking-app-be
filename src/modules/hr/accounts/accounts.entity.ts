import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'modules/base';
import { ID, GENDERS } from 'common/constant';

@Entity({
    name: 'hr_accounts'
})
export class Account extends BaseEntity {

    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    phone?: string = '';

    @Column()
    password: string;

    @Column()
    fullName: string = '';

    @Column()
    avatar?: string = '';

    @Column()
    gender?: string = GENDERS.MALE;

    @Column()
    roleId?: ID;

    @Column()
    lastLoginAt: Date;
    
}
