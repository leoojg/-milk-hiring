import { BaseRepositoryInterface } from 'src/@common/base.repository';
import { MilkProduction } from './milk-production.entity';

export interface MilkProductionRepositoryInterface
  extends BaseRepositoryInterface<MilkProduction> {
  findByFarmIdAndDate(
    farmId: string,
    date: Date,
  ): Promise<MilkProduction | null>;
  findByFarmIdAndPeriod(
    farmId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<MilkProduction[]>;
  findProductionAmountByFarmIdAndDate(
    farmId: string,
    date: Date,
  ): Promise<number | null>;
}
