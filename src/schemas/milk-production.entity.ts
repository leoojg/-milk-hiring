import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MilkProductionProps } from 'src/@core/domain/milk-production/milk-production.entity';
import * as mongoose from 'mongoose';

@Schema()
export class MilkProductionEntity implements MilkProductionProps {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true })
  farmId: string;
}

export const MilkProductionSchema =
  SchemaFactory.createForClass(MilkProductionEntity);

MilkProductionSchema.index({ date: 1, farmId: 1 }, { unique: true });
