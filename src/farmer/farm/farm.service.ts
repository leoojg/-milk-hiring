import { Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmUseCases } from 'src/@core/application/farm.use-cases';

@Injectable()
export class FarmService {
  constructor(private readonly farmUseCases: FarmUseCases) {}
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
}
