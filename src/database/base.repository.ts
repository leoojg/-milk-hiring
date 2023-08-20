import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { BaseRepositoryInterface, TEntity } from 'src/@common/base.repository';

export class BaseMongooseRepository<T extends TEntity>
  implements BaseRepositoryInterface<T>
{
  constructor(
    private model: Model<T>,
    private RepositoryDomain: typeof TEntity,
  ) {}

  removeMongoInternalFields(
    entity: Record<string, unknown>,
  ): Record<string, unknown> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, ...rest } = entity;
    return rest;
  }

  async findById(id: string): Promise<T> {
    const entity = await this.model.findById(id).lean();
    if (!entity) throw new NotFoundException('Entity not found');
    return this.RepositoryDomain.create(
      this.removeMongoInternalFields(entity),
      id,
    ) as T;
  }

  async list(): Promise<T[]> {
    return (await this.model.find().lean()).map(
      (entity) =>
        this.RepositoryDomain.create(
          this.removeMongoInternalFields(entity),
          (entity._id as ObjectId).toHexString(),
        ) as T,
    );
  }

  async create(entity: T): Promise<T> {
    await this.model.create(entity.toJSON());
    return entity;
  }

  async updateById(id: string, entity: T): Promise<T> {
    const entityToUpdate = await this.findById(id);
    await this.model.findByIdAndUpdate(id, entity);

    return this.RepositoryDomain.create(
      { ...entityToUpdate.toJSON(), ...entity.toJSON() },
      id,
    ) as T;
  }

  async deleteById(id: string): Promise<T> {
    const entity = await this.findById(id);
    await this.model.findByIdAndDelete(id);
    return entity;
  }
}
