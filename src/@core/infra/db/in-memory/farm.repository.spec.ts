import { Farm } from '../../../domain/farm/farm.entity';
import { FarmInMemoryRepository } from './farm.repository';

describe('FarmInMemoryRepository', () => {
  it('should list only farms from a farmer', async () => {
    const repository = new FarmInMemoryRepository();

    await Promise.all([
      repository.create(
        new Farm({
          name: 'farm-1',
          farmerId: 'some-farmer',
          distanceToFactory: 10,
        }),
      ),
      repository.create(
        new Farm({
          name: 'farm-2',
          farmerId: 'some-farmer',
          distanceToFactory: 15,
        }),
      ),
      repository.create(
        new Farm({
          name: 'farm-3',
          farmerId: 'some-farmer',
          distanceToFactory: 20,
        }),
      ),
      repository.create(
        new Farm({
          name: 'farm-4',
          farmerId: 'fake-farmer',
          distanceToFactory: 15,
        }),
      ),
      repository.create(
        new Farm({
          name: 'farm-5',
          farmerId: 'fake-farmer',
          distanceToFactory: 20,
        }),
      ),
    ]);

    const someFarmerFarms = await repository.listByFarmerId('some-farmer');

    expect(someFarmerFarms).toHaveLength(3);
    expect(someFarmerFarms[0].name).toBe('farm-1');
    expect(repository.items).toHaveLength(5);
  });
});
