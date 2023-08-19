import { Farm } from '../domain/farm/farm.entity';
import { BaseInMemoryRepository } from '../infra/db/in-memory/base.repository';
import { MilkProductionInMemoryRepository } from '../infra/db/in-memory/milk-production.repository';
import { MilkProductionUseCases } from './milk-production.use-cases';
import { PriceEvaluationUseCases } from './price-evaluation-use-cases';
import { PriceEvaluationInterface } from '../domain/price-evaluation/price-evaluation.entity';

class PriceEvaluation implements PriceEvaluationInterface {
  static firstSemester = {
    basePrice: 10,
    costPerKilometer: 2,
    costPerKilometerAbove: 1,
    kilometerFeeAbove: 9,
    productionBonus: 0,
    productionBonusAmount: 0,
  };
  static secondSemester = {
    basePrice: 10,
    costPerKilometer: 0,
    costPerKilometerAbove: 0,
    kilometerFeeAbove: 0,
    productionBonus: 5,
    productionBonusAmount: 100,
  };
}

let farmRepository: BaseInMemoryRepository<Farm>;
let milkProductionRepository: MilkProductionInMemoryRepository;
let milkProductionUseCases: MilkProductionUseCases;
let priceEvaluationUseCases: PriceEvaluationUseCases;

describe('ListPricingUseCases', () => {
  beforeEach(async () => {
    farmRepository = new BaseInMemoryRepository<Farm>();
    milkProductionRepository = new MilkProductionInMemoryRepository();
    milkProductionUseCases = new MilkProductionUseCases(
      milkProductionRepository,
    );
    priceEvaluationUseCases = new PriceEvaluationUseCases(
      farmRepository,
      milkProductionUseCases,
      PriceEvaluation,
    );
  });

  it('should compute production of the month', async () => {
    await farmRepository.create(
      new Farm(
        {
          name: 'John Doe',
          distanceToFactory: 10,
          farmerId: 'fake-farmer-id',
        },
        'fake-farm-id',
      ),
    );

    await Promise.all([
      milkProductionUseCases.create({
        amount: 1,
        farmId: 'fake-farm-id',
        date: new Date('2023-07-05'),
      }),
      milkProductionUseCases.create({
        amount: 50,
        farmId: 'fake-farm-id',
        date: new Date('2023-08-31'),
      }),
    ]);

    const evaluation = await priceEvaluationUseCases.monthlyPrice(
      'fake-farm-id',
      2023,
      8,
    );

    expect(evaluation.totalAmount).toEqual(
      80 * PriceEvaluation.secondSemester.basePrice,
    );
  });

  it('should compute production of the month with the bonus production', async () => {
    await farmRepository.create(
      new Farm(
        {
          name: 'John Doe',
          distanceToFactory: 10,
          farmerId: 'fake-farmer-id',
        },
        'fake-farm-id',
      ),
    );

    await Promise.all([
      milkProductionUseCases.create({
        amount: 10,
        farmId: 'fake-farm-id',
        date: new Date('2023-07-05'),
      }),
      milkProductionUseCases.create({
        amount: 50,
        farmId: 'fake-farm-id',
        date: new Date('2023-08-31'),
      }),
    ]);

    const evaluation = await priceEvaluationUseCases.monthlyPrice(
      'fake-farm-id',
      2023,
      8,
    );

    expect(evaluation.totalAmount).toEqual(
      (10 * 30 + 50) * PriceEvaluation.secondSemester.basePrice +
        (10 * 30 + 50) * PriceEvaluation.secondSemester.productionBonus,
    );
  });

  it('should compute production of the month with the distance to the factory', async () => {
    const distanceToFactory = 5;
    await farmRepository.create(
      new Farm(
        {
          name: 'John Doe',
          distanceToFactory,
          farmerId: 'fake-farmer-id',
        },
        'fake-farm-id',
      ),
    );

    await Promise.all([
      milkProductionUseCases.create({
        amount: 1,
        farmId: 'fake-farm-id',
        date: new Date('2023-04-05'),
      }),
      milkProductionUseCases.create({
        amount: 50,
        farmId: 'fake-farm-id',
        date: new Date('2023-05-31'),
      }),
    ]);

    const evaluation = await priceEvaluationUseCases.monthlyPrice(
      'fake-farm-id',
      2023,
      5,
    );

    expect(evaluation.totalAmount).toEqual(
      80 * PriceEvaluation.secondSemester.basePrice -
        distanceToFactory * PriceEvaluation.firstSemester.costPerKilometer,
    );
  });

  it('should compute production of the month with high distance to the factory', async () => {
    const distanceToFactory = 10;
    await farmRepository.create(
      new Farm(
        {
          name: 'John Doe',
          distanceToFactory,
          farmerId: 'fake-farmer-id',
        },
        'fake-farm-id',
      ),
    );

    await Promise.all([
      milkProductionUseCases.create({
        amount: 1,
        farmId: 'fake-farm-id',
        date: new Date('2023-04-05'),
      }),
      milkProductionUseCases.create({
        amount: 50,
        farmId: 'fake-farm-id',
        date: new Date('2023-05-31'),
      }),
    ]);

    const evaluation = await priceEvaluationUseCases.monthlyPrice(
      'fake-farm-id',
      2023,
      5,
    );

    expect(evaluation.totalAmount).toEqual(
      80 * PriceEvaluation.secondSemester.basePrice -
        distanceToFactory *
          (PriceEvaluation.firstSemester.costPerKilometer +
            PriceEvaluation.firstSemester.costPerKilometerAbove),
    );
  });
});
