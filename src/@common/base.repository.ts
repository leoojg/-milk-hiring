export interface BaseRepositoryInterface<T> {
  get(id: string): Promise<T>;
  list(): Promise<T[]>;
  create(entity: T): Promise<T>;
  updateById(id: string, entity: T): Promise<T>;
  deleteById(id: string): Promise<T>;
}
