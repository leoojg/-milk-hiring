import { FarmerRepositoryInterface } from '../../domain/farmer/farmer.repository';
import { Farmer, FarmerProps } from '../../domain/farmer/farmer.entity';

export class CreateFarmer {
  constructor(private readonly farmerRepository: FarmerRepositoryInterface) {}

  async execute(farmerProps: FarmerProps) {
    const farmer = new Farmer(farmerProps);
    this.farmerRepository.create(farmer);

    return farmer.toJSON();
  }
}
