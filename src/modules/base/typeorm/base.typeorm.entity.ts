import { Entity, Column, PrimaryGeneratedColumn, 
    ObjectLiteral, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { STATUS, ID } from 'src/common';

export class BaseEntity 
    implements ObjectLiteral {

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    primaryKey: number;

    @Column({
        unique: true,
        nullable: false,
        name: 'key'
    })
    id: ID;

    @Column({ 
        // type: 'smallint',
        type: 'enum',
        enum: STATUS,
        default: STATUS.ACTIVE
    })
    status: number;

    @Column({ 
        type: 'varchar',
        default: ''
    })
    createdBy: string;

    @Column({ 
        type: 'varchar',
        default: ''
    })
    updatedBy: string;

    // @Column({ 
    //     type: 'timestamptz', 
    //     default: () => 'CURRENT_TIMESTAMP' 
    // })
    @CreateDateColumn({
        type: 'timestamptz', 
        default: () => 'CURRENT_TIMESTAMP' 
    })
    // createdAt: Date;
    createdAt: any;

    // @Column({ 
    //     type: 'timestamptz', 
    //     default: () => 'CURRENT_TIMESTAMP' 
    // })
    @UpdateDateColumn({
        type: 'timestamptz', 
        default: () => 'CURRENT_TIMESTAMP' 
    })
    // updatedAt: Date;
    updatedAt: any;
}
