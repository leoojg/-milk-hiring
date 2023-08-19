import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepositoryInterface, TEntity } from 'src/@common/base.repository';

export class BaseMongooseRepository<T extends TEntity>
  implements BaseRepositoryInterface<T>
{
  constructor(private model: Model<T>) {}

  async findById(id: string): Promise<T> {
    const entity = await this.model.findById(id).lean();
    if (!entity) throw new NotFoundException('Entity not found');
    return entity as T;
  }

  async list(): Promise<T[]> {
    return this.model.find().lean();
  }

  async create(entity: T): Promise<T> {
    await this.model.create(entity);
    return entity;
  }

  async updateById(id: string, entity: T): Promise<T> {
    const entityToUpdate = await this.findById(id);
    await this.model.findByIdAndUpdate(id, entity);

    return { ...entityToUpdate, ...entity };
  }

  async deleteById(id: string): Promise<T> {
    const entity = await this.findById(id);
    await this.model.findByIdAndDelete(id);
    return entity;
  }
}
