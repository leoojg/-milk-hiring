import { Farmer } from '../domain/farmer/farmer.entity';
import { BaseInMemoryRepository } from '../../infra/db/in-memory/base.repository';
import { FarmerUseCases } from './farmer.use-cases';

describe('FarmerUseCases', () => {
  it('should create a farmer', async () => {
    const farmerRepository = new BaseInMemoryRepository<Farmer>();
    const farmerUseCases = new FarmerUseCases(farmerRepository);
    const output = await farmerUseCases.create({ name: 'John Doe' });

    expect(output.name).toEqual('John Doe');
    expect(farmerRepository.items).toHaveLength(1);
  });

  it('should update a farmer', async () => {
    const farmerRepository = new BaseInMemoryRepository<Farmer>();
    const farmerUseCases = new FarmerUseCases(farmerRepository);
    const createdFarmer = await farmerUseCases.create({ name: 'John Doe' });
    const updatedFarmer = await farmerUseCases.updateById(createdFarmer.id, {
      name: 'John Doe 2',
    });

    expect(updatedFarmer.name).toEqual('John Doe 2');
    expect(farmerRepository.items).toHaveLength(1);
  });

  it('should list all farmers', async () => {
    const farmerRepository = new BaseInMemoryRepository<Farmer>();
    const farmerUseCases = new FarmerUseCases(farmerRepository);
    const [farmer1, farmer2] = await Promise.all([
      farmerUseCases.create({ name: 'John Doe' }),
      farmerUseCases.create({ name: 'John Doe 2' }),
    ]);
    const farmers = await farmerUseCases.list();

    expect(farmers).toStrictEqual([farmer1, farmer2]);
    expect(farmers).toHaveLength(2);
    expect(farmerRepository.items).toHaveLength(2);
  });

  it('should find a farmer by id', async () => {
    const farmerRepository = new BaseInMemoryRepository<Farmer>();
    const farmerUseCases = new FarmerUseCases(farmerRepository);

    const createdFarmer = await farmerUseCases.create({ name: 'John Doe' });
    const output = await farmerUseCases.findById(createdFarmer.id);

    expect(output).toStrictEqual(createdFarmer);
  });

  it('should delete a farmer', async () => {
    const farmerRepository = new BaseInMemoryRepository<Farmer>();
    const farmerUseCases = new FarmerUseCases(farmerRepository);

    const createdFarmer = await farmerUseCases.create({ name: 'John Doe' });
    const deleted = await farmerUseCases.delete(createdFarmer.id);

    expect(deleted).toStrictEqual(createdFarmer);
    expect(farmerRepository.items).toHaveLength(0);
  });
});
