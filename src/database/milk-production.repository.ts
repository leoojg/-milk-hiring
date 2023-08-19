import { MilkProduction } from 'src/@core/domain/milk-production/milk-production.entity';
import { BaseMongooseRepository } from './base.repository';
import { MilkProductionRepositoryInterface } from 'src/@core/domain/milk-production/milk-production.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class MilkProductionMongooseRepository
  extends BaseMongooseRepository<MilkProduction>
  implements MilkProductionRepositoryInterface
{
  constructor(
    @InjectModel(MilkProduction.name)
    private milkProductionModel: Model<MilkProduction>,
  ) {
    super(milkProductionModel);
  }

  async listByFarmId(farmId: string): Promise<MilkProduction[]> {
    return this.milkProductionModel.find({ farmId }).lean();
  }

  async findByFarmIdAndDate(
    farmId: string,
    date: Date,
  ): Promise<MilkProduction | null> {
    return this.milkProductionModel.find({ farmId, date }).lean();
  }

  async findByFarmIdAndPeriod(
    farmId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<MilkProduction[]> {
    return this.milkProductionModel
      .find({ farmId, date: { $gte: startDate, $lte: endDate } })
      .sort({ date: 1 })
      .lean();
  }

  async findProductionAmountByFarmIdAndDate(
    farmId: string,
    date: Date,
  ): Promise<number> {
    const [lastProduction] = await this.milkProductionModel
      .find({ farmId, date: { $lte: date } })
      .sort({ date: 1 })
      .lean();

    return lastProduction?.amount || 0;
  }
}
