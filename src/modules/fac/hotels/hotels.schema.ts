import { SchemaFactory } from '@nestjs/mongoose';
import { Hotel } from './hotels.model';

export const HotelSchema = SchemaFactory.createForClass(Hotel);

HotelSchema.pre<Hotel>('save', async function (next) {
    // this.constructor.findOne();
    const doc = Hotel;
    const a = 
    // const count = await doc.fin
    
    // doc.id = 'a';
    next();
});
