import { BaseMongooseRepository } from './base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TEntity } from 'src/@common/base.repository';
import { Farmer } from 'src/@core/domain/farmer/farmer.entity';
import { FarmerRepositoryInterface } from 'src/@core/domain/farmer/farmer.repository';
import { FarmerEntity } from 'src/schemas/farmer.entity';

export class FarmerMongooseRepository
  extends BaseMongooseRepository<Farmer>
  implements FarmerRepositoryInterface
{
  constructor(
    @InjectModel(FarmerEntity.name)
    private farmerModel: Model<Farmer>,
  ) {
    super(farmerModel, Farmer as unknown as typeof TEntity);
  }
}
