import { MilkProductionRepositoryInterface } from 'src/@core/domain/milk-production/milk-production.repository';
import { MilkProduction } from '../../../domain/milk-production/milk-production.entity';
import { BaseInMemoryRepository } from './base.repository';

export class MilkProductionInMemoryRepository
  extends BaseInMemoryRepository<MilkProduction>
  implements MilkProductionRepositoryInterface
{
  async findByFarmIdAndDate(
    farmId: string,
    date: Date,
  ): Promise<MilkProduction | null> {
    return (
      this.items.find(
        (item) =>
          item.farmId === farmId &&
          item.date.toISOString() === date.toISOString(),
      ) || null
    );
  }

  async findByFarmIdAndPeriod(
    farmId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<MilkProduction[]> {
    return this.items
      .filter(
        (item) =>
          item.farmId === farmId &&
          item.date >= startDate &&
          item.date <= endDate,
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async findProductionAmountByFarmIdAndDate(
    farmId: string,
    date: Date,
  ): Promise<number> {
    const pastProductions = this.items.filter(
      (item) => item.farmId === farmId && item.date <= date,
    );

    const [dateProduction] = pastProductions.sort(
      (a, b) => b.date.getTime() - a.date.getTime(),
    );

    return dateProduction?.amount || 0;
  }
}
