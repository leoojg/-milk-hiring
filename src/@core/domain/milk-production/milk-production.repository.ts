import { BaseRepositoryInterface } from 'src/@common/base.repository';
import { MilkProduction } from './milk-production.entity';

export interface MilkProductionRepositoryInterface
  extends BaseRepositoryInterface<MilkProduction> {
  findByFarmIdAndDate(id: string, date: Date): Promise<MilkProduction | null>;
  findByFarmIdAndPeriod(
    id: string,
    startDate: Date,
    endDate: Date,
  ): Promise<MilkProduction[]>;
  findProductionAmountByFarmIdAndDate(
    id: string,
    date: Date,
  ): Promise<number | null>;
  // TODO: implement this methods in memory repository
}
