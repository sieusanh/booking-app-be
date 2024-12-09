import { SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from './base.mongoose.model';

export const BaseSchema = SchemaFactory.createForClass(BaseModel);
