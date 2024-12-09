import { Prop, Schema } from '@nestjs/mongoose';
import { BaseModel } from '../../base';
import { ID, GENDERS, ROLES } from 'src/common';

@Schema({ 
    // _id: false, 
    timestamps: true, 
    collection: 'fac_hotels',
})
export class Hotel extends BaseModel {

    // @Prop({
    //     unique: true,
    //     required: true,
    // })
    // id: string;

    @Prop({
        required: true,
        // type: String,
        type: 'string',
    })
    name: string = '';

    @Prop({
        required: false,
        type: 'string'
    })
    type?: string = '';

    @Prop({
        required: false,
        type: 'string',
        match: /^[+ 0-9]{8,18}$/
    })
    phone?: string = '';

    @Prop({
        required: true,
        type: 'string'
    })
    city: string = '';

    @Prop({
        null: false,
        type: 'string'
    })
    address: string = '';
    
    @Prop({
        null: false,
        type: 'string'
    })
    distance?: string = '';

    @Prop({
        type: [String]
    })
    photos?: Array<string>;

    @Prop({
        null: false,
        type: 'string'
    })
    title?: string = '';

    @Prop({
        null: false,
        type: 'string'
    })
    desc: string = '';

    @Prop({
        null: false,
        type: 'number',
        min: 0,
        max: 5
    })
    rating: number;

    @Prop({
        type: [String]
    })
    rooms: Array<string>;

    @Prop({
        null: false,
        type: 'number'
    })
    cheapestPrice: number;

    @Prop({
        type: 'boolean'
    })
    featured: boolean = false;

}
