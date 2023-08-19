import { Farm } from 'src/@core/domain/farm/farm.entity';
import { BaseInMemoryRepository } from './base.repository';
import { FarmRepositoryInterface } from 'src/@core/domain/farm/farm.repository';

export class FarmInMemoryRepository
  extends BaseInMemoryRepository<Farm>
  implements FarmRepositoryInterface
{
  async listByFarmerId(farmerId: string): Promise<Farm[]> {
    return this.items.filter((item) => item.farmerId === farmerId);
  }
}
