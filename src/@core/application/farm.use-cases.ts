import { FarmRepositoryInterface } from '../domain/farm/farm.repository';
import { Farm, FarmProps } from '../domain/farm/farm.entity';

export class FarmUseCases {
  constructor(private readonly farmRepository: FarmRepositoryInterface) {}

  async create(farmProps: FarmProps) {
    const farm = new Farm(farmProps);
    await this.farmRepository.create(farm);
    return farm.toJSON();
  }

  async updateById(id: string, farmProps: Partial<FarmProps>) {
    const farm = await this.findById(id);
    const output = await this.farmRepository.updateById(
      id,
      new Farm({ ...farm, ...farmProps }),
    );

    return output.toJSON();
  }

  async list() {
    const farms = await this.farmRepository.list();
    return farms.map((farm) => farm.toJSON());
  }

  async findById(id: string) {
    const farm = await this.farmRepository.findById(id);
    return farm.toJSON();
  }

  async delete(id: string) {
    return (await this.farmRepository.deleteById(id)).toJSON();
  }
}
