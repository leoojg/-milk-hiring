import { Injectable } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { FarmerUseCases } from 'src/@core/application/farmer.use-cases';

@Injectable()
export class FarmerService {
  constructor(private readonly farmerUseCases: FarmerUseCases) {}
  create(createFarmerDto: CreateFarmerDto) {
    return this.farmerUseCases.create(createFarmerDto);
  }

  findAll() {
    return this.farmerUseCases.list();
  }

  findOne(id: string) {
    return this.farmerUseCases.findById(id);
  }

  update(id: string, updateFarmerDto: UpdateFarmerDto) {
    return this.farmerUseCases.updateById(id, updateFarmerDto);
  }

  remove(id: string) {
    return this.farmerUseCases.delete(id);
  }
}
