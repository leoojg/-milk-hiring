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

  it('should find only milk productions from the same farm in a period', async () => {
    const repository = new MilkProductionInMemoryRepository();

    const milkProductionProps = {
      farmId: 'fake-farm',
      date: new Date('2023-08-18'),
      amount: 10,
    };

    await repository.create(new MilkProduction(milkProductionProps));

    await repository.create(
      new MilkProduction({
        ...milkProductionProps,
        date: new Date('2023-08-19'),
      }),
    );

    await repository.create(
      new MilkProduction({
        ...milkProductionProps,
        farmId: 'some-farm',
      }),
    );

    const fakeFarmProducions = await repository.findByFarmIdAndPeriod(
      'fake-farm',
      new Date('2023-08-18'),
      new Date('2023-08-19'),
    );

    expect(fakeFarmProducions).toHaveLength(2);
    expect(repository.items).toHaveLength(3);
    expect(
      fakeFarmProducions.every(
        (milkProduction) =>
          milkProduction.farmId === 'fake-farm' &&
          milkProduction.date >= new Date('2023-08-18') &&
          milkProduction.date <= new Date('2023-08-19'),
      ),
    ).toBe(true);
  });

  it('should find the production amount by farm id and date', async () => {
    const repository = new MilkProductionInMemoryRepository();

    const farmId = '1';
    const milkProduction = new MilkProduction({
      farmId,
      date: new Date('2023-08-18'),
      amount: 10,
    });
    await repository.create(milkProduction);

    const foundAmount = await repository.findProductionAmountByFarmIdAndDate(
      farmId,
      new Date('2023-08-18'),
    );

    expect(foundAmount).toBe(10);
  });

  it('should return the last production amount if there is no change for the day', async () => {
    const repository = new MilkProductionInMemoryRepository();

    const farmId = '1';
    await repository.create(
      new MilkProduction({
        farmId,
        date: new Date('2023-08-18'),
        amount: 10,
      }),
    );

    await repository.create(
      new MilkProduction({
        farmId,
        date: new Date('2023-08-11'),
        amount: 12,
      }),
    );

    await repository.create(
      new MilkProduction({
        farmId,
        date: new Date('2023-08-25'),
        amount: 15,
      }),
    );

    const foundAmount = await repository.findProductionAmountByFarmIdAndDate(
      farmId,
      new Date('2023-08-20'),
    );
    expect(foundAmount).toBe(10);
  });

  it('should return 0 if no production is registered before the date', async () => {
    const repository = new MilkProductionInMemoryRepository();

    const farmId = '1';
    await repository.create(
      new MilkProduction({
        farmId,
        date: new Date('2023-08-20'),
        amount: 10,
      }),
    );

    const foundAmount = await repository.findProductionAmountByFarmIdAndDate(
      farmId,
      new Date('2023-08-19'),
    );

    expect(foundAmount).toBe(0);
  });

  it('should not return amount of other farms', async () => {
    const repository = new MilkProductionInMemoryRepository();

    await repository.create(
      new MilkProduction({
        farmId: 'some-farm',
        date: new Date('2023-08-19'),
        amount: 25,
      }),
    );

    const foundAmount = await repository.findProductionAmountByFarmIdAndDate(
      'fake-farm',
      new Date('2023-08-19'),
    );

    expect(foundAmount).toBe(0);
  });
});
