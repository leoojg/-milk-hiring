import { FarmRepositoryInterface } from '../domain/farm/farm.repository';
import { Farm, FarmProps } from '../domain/farm/farm.entity';
import { equalObjectId } from '../../@common/util';

export class FarmUseCases {
  constructor(private readonly farmRepository: FarmRepositoryInterface) {}

  async create(farmProps: FarmProps) {
    const farm = new Farm(farmProps);
    await this.farmRepository.create(farm);
    return farm.toJSON();
  }

  async updateById(
    farmerId: string,
    id: string,
    farmProps: Partial<FarmProps>,
  ) {
    const farm = await this.findById(farmerId, id);
    const output = await this.farmRepository.updateById(
      id,
      new Farm({ ...farm, ...farmProps }),
    );

    return output.toJSON();
  }

  async list(farmerId: string) {
    const farms = await this.farmRepository.listByFarmerId(farmerId);
    return farms.map((farm) => farm.toJSON());
  }

  async findById(farmerId: string, id: string) {
    const farm = await this.farmRepository.findById(id);
    if (!equalObjectId(farm.farmerId, farmerId)) {
      throw new Error('Forbidden');
    }
    return farm.toJSON();
  }

  async delete(farmerId: string, id: string) {
    await this.findById(farmerId, id);
    return (await this.farmRepository.deleteById(id)).toJSON();
  }
}
