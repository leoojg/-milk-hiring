import { Farm } from '../domain/farm/farm.entity';
import { MilkProductionInMemoryRepository } from '../infra/db/in-memory/milk-production.repository';
import { MilkProductionUseCases } from './milk-production.use-cases';
import { PriceEvaluationUseCases } from './price-evaluation-use-cases';
import { PriceEvaluationInterface } from '../domain/price-evaluation/price-evaluation.entity';
import { FarmInMemoryRepository } from '../infra/db/in-memory/farm.repository';
import { generateObjectId } from '../../@common/util';

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

let farmRepository: FarmInMemoryRepository;
let milkProductionRepository: MilkProductionInMemoryRepository;
let milkProductionUseCases: MilkProductionUseCases;
let priceEvaluationUseCases: PriceEvaluationUseCases;

describe('ListPricingUseCases', () => {
  beforeEach(async () => {
    farmRepository = new FarmInMemoryRepository();
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
    const farmerId = generateObjectId();
    const farmId = generateObjectId();
    await farmRepository.create(
      new Farm(
        {
          name: 'John Doe',
          distanceToFactory: 10,
          farmerId,
        },
        farmId,
      ),
    );

    await Promise.all([
      milkProductionUseCases.create({
        amount: 1,
        farmId,
        date: new Date('2023-07-05'),
      }),
      milkProductionUseCases.create({
        amount: 50,
        farmId,
        date: new Date('2023-08-31'),
      }),
    ]);

    const evaluation = await priceEvaluationUseCases.monthlyReport(
      farmId,
      2023,
      8,
    );

    expect(evaluation.earnings).toEqual(
      (80 * PriceEvaluation.secondSemester.basePrice).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    );
  });

  it('should compute production of the month with the bonus production', async () => {
    const farmerId = generateObjectId();
    const farmId = generateObjectId();
    await farmRepository.create(
      new Farm(
        {
          name: 'John Doe',
          distanceToFactory: 10,
          farmerId,
        },
        farmId,
      ),
    );

    await Promise.all([
      milkProductionUseCases.create({
        amount: 10,
        farmId,
        date: new Date('2023-07-05'),
      }),
      milkProductionUseCases.create({
        amount: 50,
        farmId,
        date: new Date('2023-08-31'),
      }),
    ]);

    const evaluation = await priceEvaluationUseCases.monthlyReport(
      farmId,
      2023,
      8,
    );

    expect(evaluation.earnings).toEqual(
      (
        (10 * 30 + 50) * PriceEvaluation.secondSemester.basePrice +
        (10 * 30 + 50) * PriceEvaluation.secondSemester.productionBonus
      ).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    );
  });

  it('should compute production of the month with the distance to the factory', async () => {
    const farmerId = generateObjectId();
    const farmId = generateObjectId();
    const distanceToFactory = 5;
    await farmRepository.create(
      new Farm(
        {
          name: 'John Doe',
          distanceToFactory,
          farmerId,
        },
        farmId,
      ),
    );

    await Promise.all([
      milkProductionUseCases.create({
        amount: 1,
        farmId,
        date: new Date('2023-04-05'),
      }),
      milkProductionUseCases.create({
        amount: 50,
        farmId,
        date: new Date('2023-05-31'),
      }),
    ]);

    const evaluation = await priceEvaluationUseCases.monthlyReport(
      farmId,
      2023,
      5,
    );

    expect(evaluation.earnings).toEqual(
      (
        80 * PriceEvaluation.secondSemester.basePrice -
        distanceToFactory * PriceEvaluation.firstSemester.costPerKilometer
      ).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    );
  });

  it('should compute production of the month with high distance to the factory', async () => {
    const farmerId = generateObjectId();
    const farmId = generateObjectId();
    const distanceToFactory = 10;
    await farmRepository.create(
      new Farm(
        {
          name: 'John Doe',
          distanceToFactory,
          farmerId,
        },
        farmId,
      ),
    );

    await Promise.all([
      milkProductionUseCases.create({
        amount: 1,
        farmId,
        date: new Date('2023-04-05'),
      }),
      milkProductionUseCases.create({
        amount: 50,
        farmId,
        date: new Date('2023-05-31'),
      }),
    ]);

    const evaluation = await priceEvaluationUseCases.monthlyReport(
      farmId,
      2023,
      5,
    );

    expect(evaluation.earnings).toEqual(
      (
        80 * PriceEvaluation.secondSemester.basePrice -
        distanceToFactory *
          (PriceEvaluation.firstSemester.costPerKilometer +
            PriceEvaluation.firstSemester.costPerKilometerAbove)
      ).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    );
  });

  it('should compute production of all the year', async () => {
    const farmerId = generateObjectId();
    const farmId = generateObjectId();
    await farmRepository.create(
      new Farm(
        {
          name: 'John Doe',
          distanceToFactory: 5,
          farmerId,
        },
        farmId,
      ),
    );

    await Promise.all([
      milkProductionUseCases.create({
        amount: 5,
        farmId,
        date: new Date('2022-12-30'),
      }),
      milkProductionUseCases.create({
        amount: 10,
        farmId,
        date: new Date('2023-06-30'),
      }),
      milkProductionUseCases.create({
        amount: 0,
        farmId,
        date: new Date('2023-08-30'),
      }),
    ]);

    const evaluation = await priceEvaluationUseCases.yearlyReport(farmId, 2023);

    expect(evaluation).toHaveLength(12);
  });
});
