import { FarmerRepositoryInterface } from '../domain/farmer/farmer.repository';
import { Farmer, FarmerProps } from '../domain/farmer/farmer.entity';

export class FarmerUseCases {
  constructor(private readonly farmerRepository: FarmerRepositoryInterface) {}

  async create(farmerProps: FarmerProps) {
    const farmer = new Farmer(farmerProps);
    await this.farmerRepository.create(farmer);
    return farmer.toJSON();
  }

  async updateById(id: string, farmerProps: FarmerProps) {
    const farmer = await this.findById(id);
    const output = await this.farmerRepository.updateById(
      id,
      new Farmer({ ...farmer, ...farmerProps }),
    );

    return output.toJSON();
  }

  async list() {
    const farmers = await this.farmerRepository.list();
    return farmers.map((farmer) => farmer.toJSON());
  }

  async findById(id: string) {
    const farmer = await this.farmerRepository.findById(id);
    return farmer.toJSON();
  }

  async delete(id: string) {
    return (await this.farmerRepository.deleteById(id)).toJSON();
  }
}
