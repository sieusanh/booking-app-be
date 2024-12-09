import { Prop, Schema } from '@nestjs/mongoose';
import { BaseModel } from '../../base';
import { ID, GENDERS, ROLES } from 'src/common';

export interface RoomNumbers {
    number: number;
    unavailableDates: {
        type: Array<Date>
    };
}

@Schema({ 
    timestamps: true, 
    collection: 'fac_rooms',
})
export class Room extends BaseModel {

    @Prop({
        required: true,
        type: 'string',
    })
    title: string = '';

    @Prop({
        required: true,
        type: 'number'
    })
    price: number = 0;

    @Prop({
        required: true,
        type: 'number'
    })
    maxPeople: number = 0;
    
    @Prop({
        required: true,
        type: 'string',
    })
    desc: string = '';

    @Prop({
        type: [
            {
                number: Number,
                unavailableDates: {
                    type: [Date]
                }
            }
        ]
    })
    roomNumbers: RoomNumbers
}
