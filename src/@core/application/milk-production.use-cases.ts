import { MilkProductionRepositoryInterface } from '../domain/milk-production/milk-production.repository';
import {
  MilkProduction,
  MilkProductionProps,
} from '../domain/milk-production/milk-production.entity';

type MilkmonthlyProduction = {
  date: string;
  amount: number;
};

export class MilkProductionUseCases {
  constructor(
    private readonly milkProductionRepository: MilkProductionRepositoryInterface,
  ) {}

  async create(milkProductionProps: MilkProductionProps) {
    const conflict = await this.milkProductionRepository.findByFarmIdAndDate(
      milkProductionProps.farmId,
      milkProductionProps.date,
    );

    if (conflict) {
      throw new Error('Cannot insert milk production for the same day twice');
    }

    const milkProduction = new MilkProduction(milkProductionProps);
    await this.milkProductionRepository.create(milkProduction);
    return milkProduction.toJSON();
  }

  async updateById(
    farmId: string,
    id: string,
    milkProductionProps: Partial<MilkProductionProps>,
  ) {
    const milkProduction = await this.findById(farmId, id);
    const output = await this.milkProductionRepository.updateById(
      id,
      new MilkProduction({ ...milkProduction, ...milkProductionProps }),
    );

    return output.toJSON();
  }

  async list(farmId: string) {
    const milkProductions =
      await this.milkProductionRepository.listByFarmId(farmId);
    return milkProductions.map((milkProduction) => milkProduction.toJSON());
  }

  async findById(farmId: string, id: string) {
    const milkProduction = await this.milkProductionRepository.findById(id);
    return milkProduction.toJSON();
  }

  async delete(farmId: string, id: string) {
    await this.findById(farmId, id);
    return (await this.milkProductionRepository.deleteById(id)).toJSON();
  }

  async monthlyProduction(farmId: string, year: number, month: number) {
    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 0));

    const monthRecords =
      await this.milkProductionRepository.findByFarmIdAndPeriod(
        farmId,
        startDate,
        endDate,
      );

    const initialPeriodProduction =
      (await this.milkProductionRepository.findProductionAmountByFarmIdAndDate(
        farmId,
        startDate,
      )) ?? 0;

    const monthlyProduction: MilkmonthlyProduction[] = new Array(
      new Date(year, month, 0).getDate(),
    )
      .fill(0)
      .map((_, i) => {
        const date = new Date(Date.UTC(year, month - 1, i + 1));
        const amount = monthRecords.find((record) => record.date <= date)
          ?.amount;

        return {
          date: date.toISOString(),
          amount: amount ?? initialPeriodProduction,
        };
      });
    return monthlyProduction;
  }

  async monthlyReport(farmId: string, year: number, month: number) {
    const monthlyProduction = await this.monthlyProduction(farmId, year, month);

    const averageProduction =
      monthlyProduction.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0) / monthlyProduction.length;

    return {
      monthlyProduction,
      averageProduction: averageProduction.toFixed(3) + 'L',
    };
  }
}
