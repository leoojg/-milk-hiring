import { MilkProductionInMemoryRepository } from '../infra/db/in-memory/milk-production.repository';
import { MilkProductionUseCases } from './milk-production.use-cases';

describe('MilkProductionUseCases', () => {
  it('should create a MilkProduction', async () => {
    const milkProductionRepository = new MilkProductionInMemoryRepository();
    const milkProductionUseCases = new MilkProductionUseCases(
      milkProductionRepository,
    );
    const output = await milkProductionUseCases.create({
      farmId: '1',
      date: new Date('2023-08-18'),
      amount: 1,
    });

    expect(output).toStrictEqual({
      id: output.id,
      farmId: '1',
      date: new Date('2023-08-18'),
      amount: 1,
    });
    expect(milkProductionRepository.items).toHaveLength(1);
  });

  it('should update a MilkProduction', async () => {
    const milkProductionRepository = new MilkProductionInMemoryRepository();
    const milkProductionUseCases = new MilkProductionUseCases(
      milkProductionRepository,
    );
    const createdMilkProduction = await milkProductionUseCases.create({
      farmId: '1',
      date: new Date('2023-08-18'),
      amount: 1,
    });
    const updatedMilkProduction = await milkProductionUseCases.updateById(
      createdMilkProduction.id,
      {
        farmId: '1',
        date: new Date('2023-08-18'),
        amount: 1,
      },
    );

    expect(updatedMilkProduction).toStrictEqual({
      id: updatedMilkProduction.id,
      farmId: '1',
      date: new Date('2023-08-18'),
      amount: 1,
    });
    expect(milkProductionRepository.items).toHaveLength(1);
  });

  it('should list all MilkProductions', async () => {
    const milkProductionRepository = new MilkProductionInMemoryRepository();
    const milkProductionUseCases = new MilkProductionUseCases(
      milkProductionRepository,
    );
    const [MilkProduction1, MilkProduction2] = await Promise.all([
      milkProductionUseCases.create({
        farmId: '1',
        date: new Date('2023-08-18'),
        amount: 1,
      }),
      milkProductionUseCases.create({
        farmId: '1',
        date: new Date('2023-08-19'),
        amount: 10,
      }),
    ]);
    const milkProductions = await milkProductionUseCases.list();

    expect(milkProductions).toStrictEqual([MilkProduction1, MilkProduction2]);
    expect(milkProductions).toHaveLength(2);
    expect(milkProductionRepository.items).toHaveLength(2);
  });

  it('should find a MilkProduction by id', async () => {
    const milkProductionRepository = new MilkProductionInMemoryRepository();
    const milkProductionUseCases = new MilkProductionUseCases(
      milkProductionRepository,
    );

    const createdMilkProduction = await milkProductionUseCases.create({
      farmId: '1',
      date: new Date('2023-08-19'),
      amount: 10,
    });
    const output = await milkProductionUseCases.findById(
      createdMilkProduction.id,
    );

    expect(output).toStrictEqual(createdMilkProduction);
  });

  it('should delete a MilkProduction', async () => {
    const milkProductionRepository = new MilkProductionInMemoryRepository();
    const milkProductionUseCases = new MilkProductionUseCases(
      milkProductionRepository,
    );

    const createdMilkProduction = await milkProductionUseCases.create({
      farmId: '1',
      date: new Date('2023-08-19'),
      amount: 10,
    });
    const deleted = await milkProductionUseCases.delete(
      createdMilkProduction.id,
    );

    expect(deleted).toStrictEqual(createdMilkProduction);
    expect(milkProductionRepository.items).toHaveLength(0);
  });

  it('should not create two MilkProductions for the same day and farmId', async () => {
    const milkProductionRepository = new MilkProductionInMemoryRepository();
    const milkProductionUseCases = new MilkProductionUseCases(
      milkProductionRepository,
    );

    const milkProductionProps = {
      farmId: '1',
      date: new Date('2023-08-19'),
      amount: 10,
    };

    await milkProductionUseCases.create(milkProductionProps);
    await expect(
      milkProductionUseCases.create(milkProductionProps),
    ).rejects.toThrow('Cannot insert milk production for the same day twice');
    expect(milkProductionRepository.items).toHaveLength(1);
  });

  it('should return correct milk production report', async () => {
    const milkProductionRepository = new MilkProductionInMemoryRepository();
    const milkProductionUseCases = new MilkProductionUseCases(
      milkProductionRepository,
    );

    await milkProductionUseCases.create({
      farmId: '1',
      date: new Date('2023-08-10'),
      amount: 5,
    });

    await milkProductionUseCases.create({
      farmId: '1',
      date: new Date('2023-08-20'),
      amount: 10,
    });

    await milkProductionUseCases.create({
      farmId: '1',
      date: new Date('2023-08-30'),
      amount: 15,
    });

    const { dailyProduction, averageProduction } =
      await milkProductionUseCases.monthlyReport('1', 2023, 8);

    expect(averageProduction).toBe(
      (
        dailyProduction.reduce((a, b) => a + b.amount, 0) /
        dailyProduction.length
      ).toFixed(3),
    );

    expect(dailyProduction[8]).toStrictEqual({
      amount: 0,
      date: new Date('2023-08-09').toISOString(),
    });
    expect(dailyProduction[9]).toStrictEqual({
      amount: 5,
      date: new Date('2023-08-10').toISOString(),
    });
    expect(dailyProduction[18]).toStrictEqual({
      amount: 5,
      date: new Date('2023-08-19').toISOString(),
    });
    expect(dailyProduction[19]).toStrictEqual({
      amount: 10,
      date: new Date('2023-08-20').toISOString(),
    });
    expect(dailyProduction[28]).toStrictEqual({
      amount: 10,
      date: new Date('2023-08-29').toISOString(),
    });
    expect(dailyProduction[29]).toStrictEqual({
      amount: 15,
      date: new Date('2023-08-30').toISOString(),
    });
  });
});
