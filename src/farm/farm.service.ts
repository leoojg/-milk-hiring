import { Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmUseCases } from 'src/@core/application/farm.use-cases';

@Injectable()
export class FarmService {
  constructor(private readonly farmUseCases: FarmUseCases) {}
  create(createFarmDto: CreateFarmDto) {
    return this.farmUseCases.create(createFarmDto);
  }

  findAll() {
    return this.farmUseCases.list();
  }

  findOne(id: string) {
    return this.farmUseCases.findById(id);
  }

  update(id: string, updateFarmDto: UpdateFarmDto) {
    return this.farmUseCases.updateById(id, updateFarmDto);
  }

  remove(id: string) {
    return this.farmUseCases.delete(id);
  }
}
