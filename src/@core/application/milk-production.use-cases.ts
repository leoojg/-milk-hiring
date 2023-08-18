import { MilkProductionRepositoryInterface } from '../domain/milk-production/milk-production.repository';
import {
  MilkProduction,
  MilkProductionProps,
} from '../domain/milk-production/milk-production.entity';

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
}
