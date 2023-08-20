import { MilkProduction } from 'src/@core/domain/milk-production/milk-production.entity';
import { BaseMongooseRepository } from './base.repository';
import { MilkProductionRepositoryInterface } from 'src/@core/domain/milk-production/milk-production.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MilkProductionEntity } from 'src/schemas/milk-production.entity';
import { TEntity } from 'src/@common/base.repository';
import { generateObjectId } from 'src/@common/util';

export class MilkProductionMongooseRepository
  extends BaseMongooseRepository<MilkProduction>
  implements MilkProductionRepositoryInterface
{
  constructor(
    @InjectModel(MilkProductionEntity.name)
    private milkProductionModel: Model<MilkProduction>,
  ) {
    super(milkProductionModel, MilkProduction as unknown as typeof TEntity);
  }

  async listByFarmId(farmId: string): Promise<MilkProduction[]> {
    return (await this.milkProductionModel.find({ farmId }).lean()).map(
      (milkProduction) =>
        MilkProduction.create(
          this.removeMongoInternalFields(milkProduction),
          generateObjectId(milkProduction._id),
        ),
    );
  }

  async findByFarmIdAndDate(
    farmId: string,
    date: Date,
  ): Promise<MilkProduction | null> {
    const entity = await this.milkProductionModel
      .findOne({ farmId, date })
      .lean();

    if (!entity) return null;

    return MilkProduction.create(
      this.removeMongoInternalFields(entity),
      generateObjectId(entity._id),
    );
  }

  async findByFarmIdAndPeriod(
    farmId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<MilkProduction[]> {
    return (
      await this.milkProductionModel
        .find({ farmId, date: { $gte: startDate, $lte: endDate } })
        .sort({ date: -1 })
        .lean()
    ).map((milkProduction) =>
      MilkProduction.create(
        this.removeMongoInternalFields(milkProduction),
        generateObjectId(milkProduction._id),
      ),
    );
  }

  async findProductionAmountByFarmIdAndDate(
    farmId: string,
    date: Date,
  ): Promise<number> {
    const [lastProduction] = await this.milkProductionModel
      .find({ farmId, date: { $lte: date } })
      .sort({ date: -1 })
      .lean();

    return lastProduction?.amount || 0;
  }
}
