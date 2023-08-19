import { BaseMongooseRepository } from './base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Farm } from 'src/@core/domain/farm/farm.entity';
import { FarmRepositoryInterface } from 'src/@core/domain/farm/farm.repository';

export class FarmMongooseRepository
  extends BaseMongooseRepository<Farm>
  implements FarmRepositoryInterface
{
  constructor(
    @InjectModel(Farm.name)
    private milkProductionModel: Model<Farm>,
  ) {
    super(milkProductionModel);
  }

  async listByFarmerId(farmerId: string): Promise<Farm[]> {
    return this.milkProductionModel.find({ farmerId }).lean();
  }
}
