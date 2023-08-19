import { BaseRepositoryInterface } from 'src/@common/base.repository';

export class BaseInMemoryRepository<T> implements BaseRepositoryInterface<T> {
  items: T[] = [];

  async findById(id: string): Promise<T> {
    const item = this.items.find((item) => item['id'] === id);
    if (!item) throw new Error('Entity not found');
    return item;
  }

  async list(): Promise<T[]> {
    return this.items;
  }

  async create(entity: T): Promise<T> {
    this.items.push(entity);
    return entity;
  }

  async updateById(id: string, entity: T): Promise<T> {
    const index = this.items.findIndex((item) => item['id'] === id);
    if (index === -1) throw new Error('Entity not found');
    this.items[index] = entity;
    return entity;
  }

  async deleteById(id: string): Promise<T> {
    const index = this.items.findIndex((item) => item['id'] === id);
    if (index === -1) throw new Error('Entity not found');
    const deletedItem = this.items[index];
    this.items.splice(index, 1);
    return deletedItem;
  }
}
