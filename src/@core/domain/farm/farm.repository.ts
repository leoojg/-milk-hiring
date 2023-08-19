import { BaseRepositoryInterface } from 'src/@common/base.repository';
import { Farm } from './farm.entity';

export interface FarmRepositoryInterface extends BaseRepositoryInterface<Farm> {
  listByFarmerId(farmerId: string): Promise<Farm[]>;
}
