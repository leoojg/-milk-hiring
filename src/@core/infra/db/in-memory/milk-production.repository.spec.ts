import { MilkProduction } from '../../../domain/milk-production/milk-production.entity';
import { MilkProductionInMemoryRepository } from './milk-production.repository';

describe('MilkProductionInMemoryRepository', () => {
  it('should find a milk production by farm id and date', async () => {
    const repository = new MilkProductionInMemoryRepository();
    const farmId = '1';
    const date = new Date('2021-01-01');
    const milkProduction = new MilkProduction({
      farmId: '1',
      date: new Date('2021-01-01'),
      amount: 10,
    });
    await repository.create(milkProduction);

    const foundMilkProduction = await repository.findByFarmIdAndDate(
      farmId,
      date,
    );

    expect(foundMilkProduction).toStrictEqual(milkProduction);
  });
});
