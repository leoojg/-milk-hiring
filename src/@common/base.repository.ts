export interface BaseRepositoryInterface<T> {
  findById(id: string): Promise<T>;
  list(): Promise<T[]>;
  create(entity: T): Promise<T>;
  updateById(id: string, entity: T): Promise<T>;
  deleteById(id: string): Promise<T>;
}

export abstract class TEntity {
  static create(entity: Record<string, unknown>, id?: string): TEntity {
    return new (this as any)(entity, id);
  }
  abstract toJSON(): Record<string, unknown>;
}
