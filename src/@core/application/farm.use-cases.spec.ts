import { Farm } from '../domain/farm/farm.entity';
import { BaseInMemoryRepository } from '../infra/db/in-memory/base.repository';
import { FarmUseCases } from './farm.use-cases';

describe('FarmUseCases', () => {
  it('should create a farm', async () => {
    const farmRepository = new BaseInMemoryRepository<Farm>();
    const farmUseCases = new FarmUseCases(farmRepository);
    const output = await farmUseCases.create({
      name: 'John Doe',
      farmerId: '1',
      distanceToFactory: 10,
    });

    expect(output.name).toEqual('John Doe');
    expect(farmRepository.items).toHaveLength(1);
  });

  it('should update a farm', async () => {
    const farmRepository = new BaseInMemoryRepository<Farm>();
    const farmUseCases = new FarmUseCases(farmRepository);
    const createdFarm = await farmUseCases.create({
      name: 'John Doe',
      farmerId: '1',
      distanceToFactory: 10,
    });
    const updatedFarm = await farmUseCases.updateById(createdFarm.id, {
      name: 'John Doe 2',
    });

    expect(updatedFarm.name).toEqual('John Doe 2');
    expect(farmRepository.items).toHaveLength(1);
  });

  it('should list all farms', async () => {
    const farmRepository = new BaseInMemoryRepository<Farm>();
    const farmUseCases = new FarmUseCases(farmRepository);
    const [farm1, farm2] = await Promise.all([
      farmUseCases.create({
        name: 'John Doe',
        farmerId: '1',
        distanceToFactory: 10,
      }),
      farmUseCases.create({
        name: 'John Doe 2',
        farmerId: '1',
        distanceToFactory: 10,
      }),
    ]);
    const farms = await farmUseCases.list();

    expect(farms).toStrictEqual([farm1, farm2]);
    expect(farms).toHaveLength(2);
    expect(farmRepository.items).toHaveLength(2);
  });

  it('should find a farm by id', async () => {
    const farmRepository = new BaseInMemoryRepository<Farm>();
    const farmUseCases = new FarmUseCases(farmRepository);

    const createdFarm = await farmUseCases.create({
      name: 'John Doe',
      farmerId: '1',
      distanceToFactory: 10,
    });
    const output = await farmUseCases.findById(createdFarm.id);

    expect(output).toStrictEqual(createdFarm);
  });

  it('should delete a farm', async () => {
    const farmRepository = new BaseInMemoryRepository<Farm>();
    const farmUseCases = new FarmUseCases(farmRepository);

    const createdFarm = await farmUseCases.create({
      name: 'John Doe',
      farmerId: '1',
      distanceToFactory: 10,
    });
    const deleted = await farmUseCases.delete(createdFarm.id);

    expect(deleted).toStrictEqual(createdFarm);
    expect(farmRepository.items).toHaveLength(0);
  });
});
