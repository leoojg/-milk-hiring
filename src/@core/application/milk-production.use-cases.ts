import { MilkProductionRepositoryInterface } from '../domain/milk-production/milk-production.repository';
import {
  MilkProduction,
  MilkProductionProps,
} from '../domain/milk-production/milk-production.entity';

type MilkDailyProduction = {
  date: Date;
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
    id: string,
    milkProductionProps: Partial<MilkProductionProps>,
  ) {
    const milkProduction = await this.findById(id);
    const output = await this.milkProductionRepository.updateById(
      id,
      new MilkProduction({ ...milkProduction, ...milkProductionProps }),
    );

    return output.toJSON();
  }

  async list() {
    const MilkProductions = await this.milkProductionRepository.list();
    return MilkProductions.map((MilkProduction) => MilkProduction.toJSON());
  }

  async findById(id: string) {
    const MilkProduction = await this.milkProductionRepository.findById(id);
    return MilkProduction.toJSON();
  }

  async delete(id: string) {
    return (await this.milkProductionRepository.deleteById(id)).toJSON();
  }

  async mensalReport(farmId: string, year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

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

    const dailyProduction: MilkDailyProduction[] = new Array(endDate.getDate())
      .fill(0)
      .map((_, i) => {
        const date = new Date(year, month - 1, i + 1);
        const amount = monthRecords.find((record) => record.date <= date)
          ?.amount;

        return {
          date,
          amount: amount ?? initialPeriodProduction,
        };
      });

    const averageProduction =
      dailyProduction.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0) / dailyProduction.length;

    return { dailyProduction, averageProduction: averageProduction.toFixed(3) };
    // TODO: create test cases for this method
  }
}
