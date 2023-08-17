import { BaseRepositoryInterface } from 'src/@common/base.repository';
import { Farmer } from './farmer.entity';

export interface FarmerRepositoryInterface
  extends BaseRepositoryInterface<Farmer> {}
