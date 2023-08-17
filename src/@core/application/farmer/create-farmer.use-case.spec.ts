import { BaseInMemoryRepository } from '../../../infra/db/in-memory/base.repository';
import { CreateFarmer } from './create-farmer.use-case';
import { Farmer } from '../../domain/farmer/farmer.entity';

describe('CreateFarmerUseCase', () => {
  it('should create a farmer', async () => {
    const farmerRepository = new BaseInMemoryRepository<Farmer>();
    const createFarmer = new CreateFarmer(farmerRepository);
    const output = await createFarmer.execute({ name: 'John Doe' });

    expect(output.name).toEqual('John Doe');
    expect(farmerRepository.items).toHaveLength(1);
  });
});
