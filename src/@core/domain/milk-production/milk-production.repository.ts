import { BaseRepositoryInterface } from 'src/@common/base.repository';
import { MilkProduction } from './milk-production.entity';

export interface MilkProductionRepositoryInterface
  extends BaseRepositoryInterface<MilkProduction> {
  findByFarmIdAndDate(id: string, date: Date): Promise<MilkProduction | null>;
}
