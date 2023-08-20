import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FarmProps } from 'src/@core/domain/farm/farm.entity';
import * as mongoose from 'mongoose';

@Schema({
  collection: 'farms',
})
export class FarmEntity implements FarmProps {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true })
  farmerId: string;

  @Prop({ required: true })
  distanceToFactory: number;
}

export const FarmSchema = SchemaFactory.createForClass(FarmEntity);
