import { Injectable } from '@nestjs/common';
import { MilkProductionUseCases } from 'src/@core/application/milk-production.use-cases';
import { CreateMilkProductionDto } from './dto/create-milk-production.dto';
import { UpdateMilkProductionDto } from './dto/update-milk-production.dto';

@Injectable()
export class MilkProductionService {
  constructor(
    private readonly milkProductionUseCases: MilkProductionUseCases,
  ) {}
  create(createMilkProductionDto: CreateMilkProductionDto) {
    return this.milkProductionUseCases.create(createMilkProductionDto);
  }

  findAll(farmId: string) {
    return this.milkProductionUseCases.list(farmId);
  }

  findOne(id: string) {
    return this.milkProductionUseCases.findById(id);
  }

  update(id: string, updateMilkProductionDto: UpdateMilkProductionDto) {
    return this.milkProductionUseCases.updateById(id, updateMilkProductionDto);
  }

  remove(id: string) {
    return this.milkProductionUseCases.delete(id);
  }
}
