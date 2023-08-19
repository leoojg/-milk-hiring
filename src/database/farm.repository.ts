import { BaseMongooseRepository } from './base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Farm } from 'src/@core/domain/farm/farm.entity';
import { FarmRepositoryInterface } from 'src/@core/domain/farm/farm.repository';
import { FarmEntity } from 'src/schemas/farm.entity';

export class FarmMongooseRepository
  extends BaseMongooseRepository<Farm>
  implements FarmRepositoryInterface
{
  constructor(
    @InjectModel(FarmEntity.name)
    private farmModel: Model<Farm>,
  ) {
    super(farmModel);
  }

  async listByFarmerId(farmerId: string): Promise<Farm[]> {
    return this.farmModel.find({ farmerId }).lean();
  }
}
