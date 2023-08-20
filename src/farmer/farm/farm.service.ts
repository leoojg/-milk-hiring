import { Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmUseCases } from 'src/@core/application/farm.use-cases';
import { MilkProductionUseCases } from '../../@core/application/milk-production.use-cases';
import { PriceEvaluationUseCases } from '../../@core/application/price-evaluation-use-cases';

@Injectable()
export class FarmService {
  constructor(
    private readonly farmUseCases: FarmUseCases,
    private readonly milkProductionUseCases: MilkProductionUseCases,
    private readonly priceEvaluationUseCases: PriceEvaluationUseCases,
  ) {}
  create(farmerId: string, createFarmDto: CreateFarmDto) {
    return this.farmUseCases.create({ ...createFarmDto, farmerId });
  }

  findAll(farmerId: string) {
    return this.farmUseCases.list(farmerId);
  }

  findOne(farmerId: string, id: string) {
    return this.farmUseCases.findById(farmerId, id);
  }

  update(farmerId: string, id: string, updateFarmDto: UpdateFarmDto) {
    return this.farmUseCases.updateById(farmerId, id, updateFarmDto);
  }

  remove(farmerId: string, id: string) {
    return this.farmUseCases.delete(farmerId, id);
  }

  getMonthlyProduction(id: string, year: number, month: number) {
    return this.milkProductionUseCases.monthlyReport(id, year, month);
  }

  getMonthlyReport(id: string, year: number, month: number) {
    return this.priceEvaluationUseCases.monthlyReport(id, year, month);
  }

  getYearlyReport(id: string, year: number) {
    return this.priceEvaluationUseCases.yearlyReport(id, year);
  }
}
