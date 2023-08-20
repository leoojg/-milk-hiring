import { BaseMongooseRepository } from './base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TEntity } from 'src/@common/base.repository';
import { Farm } from 'src/@core/domain/farm/farm.entity';
import { FarmRepositoryInterface } from 'src/@core/domain/farm/farm.repository';
import { FarmEntity } from 'src/schemas/farm.entity';
import { ObjectId } from 'mongodb';

export class FarmMongooseRepository
  extends BaseMongooseRepository<Farm>
  implements FarmRepositoryInterface
{
  constructor(
    @InjectModel(FarmEntity.name)
    private farmModel: Model<Farm>,
  ) {
    super(farmModel, Farm as unknown as typeof TEntity);
  }

  async listByFarmerId(farmerId: string): Promise<Farm[]> {
    return (await this.farmModel.find({ farmerId }).lean()).map((farm) =>
      Farm.create(
        this.removeMongoInternalFields(farm),
        (farm._id as ObjectId).toHexString(),
      ),
    );
  }
}
