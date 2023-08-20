import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FarmerProps } from 'src/@core/domain/farmer/farmer.entity';

@Schema({
  collection: 'farmers',
})
export class FarmerEntity implements FarmerProps {
  @Prop({ required: true })
  name: string;
}

export const FarmerSchema = SchemaFactory.createForClass(FarmerEntity);
