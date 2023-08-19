import { FarmInMemoryRepository } from '../infra/db/in-memory/farm.repository';
import { FarmUseCases } from './farm.use-cases';

let farmRepository: FarmInMemoryRepository;
let farmUseCases: FarmUseCases;

// TODO: add tests to ensure that only the farmer can access his farms
describe('FarmUseCases', () => {
  beforeEach(() => {
    farmRepository = new FarmInMemoryRepository();
    farmUseCases = new FarmUseCases(farmRepository);
  });
  it('should create a farm', async () => {
    const output = await farmUseCases.create({
      name: 'John Doe',
      farmerId: '1',
      distanceToFactory: 10,
    });

    expect(output.name).toEqual('John Doe');
    expect(farmRepository.items).toHaveLength(1);
  });

  it('should update a farm', async () => {
    const createdFarm = await farmUseCases.create({
      name: 'John Doe',
      farmerId: '1',
      distanceToFactory: 10,
    });
    const updatedFarm = await farmUseCases.updateById('1', createdFarm.id, {
      name: 'John Doe 2',
    });

    expect(updatedFarm.name).toEqual('John Doe 2');
    expect(farmRepository.items).toHaveLength(1);
  });

  it('should list all farms', async () => {
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
    const farms = await farmUseCases.list('1');

    expect(farms).toStrictEqual([farm1, farm2]);
    expect(farms).toHaveLength(2);
    expect(farmRepository.items).toHaveLength(2);
  });

  it('should find a farm by id', async () => {
    const createdFarm = await farmUseCases.create({
      name: 'John Doe',
      farmerId: '1',
      distanceToFactory: 10,
    });
    const output = await farmUseCases.findById('1', createdFarm.id);

    expect(output).toStrictEqual(createdFarm);
  });

  it('should delete a farm', async () => {
    const createdFarm = await farmUseCases.create({
      name: 'John Doe',
      farmerId: '1',
      distanceToFactory: 10,
    });
    const deleted = await farmUseCases.delete('1', createdFarm.id);

    expect(deleted).toStrictEqual(createdFarm);
    expect(farmRepository.items).toHaveLength(0);
  });
});
