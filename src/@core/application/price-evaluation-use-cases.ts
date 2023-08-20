import { PriceEvaluationInterface } from '../domain/price-evaluation/price-evaluation.entity';
import { FarmRepositoryInterface } from '../domain/farm/farm.repository';
import { MilkProductionUseCases } from './milk-production.use-cases';

export class PriceEvaluationUseCases {
  constructor(
    private readonly farmRepository: FarmRepositoryInterface,
    private readonly milkProductionUseCases: MilkProductionUseCases,
    private readonly priceEvaluation: typeof PriceEvaluationInterface,
  ) {}

  async monthlyReport(farmId: string, year: number, month: number) {
    const farm = await this.farmRepository.findById(farmId);

    const monthlyProduction =
      await this.milkProductionUseCases.monthlyProduction(farmId, year, month);

    const monthlyProductionAmount = monthlyProduction.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);

    const evaluation =
      this.priceEvaluation[month <= 6 ? 'firstSemester' : 'secondSemester'];

    this.priceEvaluation.firstSemester.basePrice;

    const kilometerPrice =
      evaluation.costPerKilometer +
      (farm.distanceToFactory > evaluation.kilometerFeeAbove
        ? evaluation.costPerKilometerAbove
        : 0);

    const productionBonus =
      monthlyProductionAmount > evaluation.productionBonusAmount
        ? evaluation.productionBonus
        : 0;

    const totalEarningAmount =
      monthlyProductionAmount * evaluation.basePrice -
      (monthlyProductionAmount !== 0
        ? kilometerPrice * farm.distanceToFactory
        : 0) +
      productionBonus * monthlyProductionAmount;

    return {
      monthProduction: monthlyProductionAmount.toFixed(3) + ' L',
      earnings: totalEarningAmount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      year,
      month,
    };
  }

  async yearlyReport(farmId: string, year: number) {
    const monthlyReportPromises = Array.from({ length: 12 }).map((_, index) =>
      this.monthlyReport(farmId, year, index + 1),
    );

    const monthlyReports = await Promise.all(monthlyReportPromises);

    return monthlyReports;
  }
}
