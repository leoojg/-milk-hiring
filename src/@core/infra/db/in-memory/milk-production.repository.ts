import { MilkProductionRepositoryInterface } from 'src/@core/domain/milk-production/milk-production.repository';
import { MilkProduction } from '../../../domain/milk-production/milk-production.entity';
import { BaseInMemoryRepository } from './base.repository';

export class MilkProductionInMemoryRepository
  extends BaseInMemoryRepository<MilkProduction>
  implements MilkProductionRepositoryInterface
{
  async findByFarmIdAndDate(
    id: string,
    date: Date,
  ): Promise<MilkProduction | null> {
    return (
      this.items.find(
        (item) =>
          item.farmId === id && item.date.toISOString() === date.toISOString(),
      ) || null
    );
  }
}
