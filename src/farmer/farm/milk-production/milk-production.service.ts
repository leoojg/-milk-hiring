import { Injectable } from '@nestjs/common';
import { MilkProductionUseCases } from 'src/@core/application/milk-production.use-cases';
import { CreateMilkProductionDto } from './dto/create-milk-production.dto';
import { UpdateMilkProductionDto } from './dto/update-milk-production.dto';

@Injectable()
export class MilkProductionService {
  constructor(
    private readonly milkProductionUseCases: MilkProductionUseCases,
  ) {}
  create(farmId: string, createMilkProductionDto: CreateMilkProductionDto) {
    return this.milkProductionUseCases.create({
      ...createMilkProductionDto,
      farmId,
    });
  }

  findAll(farmId: string) {
    return this.milkProductionUseCases.list(farmId);
  }

  findOne(farmId: string, id: string) {
    return this.milkProductionUseCases.findById(farmId, id);
  }

  update(
    farmId: string,
    id: string,
    updateMilkProductionDto: UpdateMilkProductionDto,
  ) {
    return this.milkProductionUseCases.updateById(
      farmId,
      id,
      updateMilkProductionDto,
    );
  }

  remove(farmId: string, id: string) {
    return this.milkProductionUseCases.delete(farmId, id);
  }
}
