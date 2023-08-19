import { BaseInMemoryRepository } from './base.repository';

class Item {
  id: string;
  name: string;
}

describe('BaseInMemoryRepository', () => {
  it('should create an item', async () => {
    const repository = new BaseInMemoryRepository<Item>();

    const item = await repository.create({ id: '1', name: 'John Doe' });

    expect(item).toStrictEqual({ id: '1', name: 'John Doe' });
    expect(repository.items).toHaveLength(1);
  });

  it('should update an item', async () => {
    const repository = new BaseInMemoryRepository<Item>();

    const createdItem = await repository.create({ id: '1', name: 'John Doe' });
    const updatedItem = await repository.updateById(createdItem.id, {
      id: '1',
      name: 'John Doe 2',
    });

    expect(updatedItem).toStrictEqual({ id: '1', name: 'John Doe 2' });
    expect(repository.items).toHaveLength(1);
  });

  it('should list items', async () => {
    const repository = new BaseInMemoryRepository<Item>();

    await repository.create({ id: '1', name: 'John Doe' });
    await repository.create({ id: '2', name: 'John Doe 2' });

    const items = await repository.list();

    expect(items).toHaveLength(2);
  });

  it('should find an item by id', async () => {
    const repository = new BaseInMemoryRepository<Item>();

    await repository.create({ id: '1', name: 'John Doe' });

    const item = await repository.findById('1');

    expect(item).toStrictEqual({ id: '1', name: 'John Doe' });
  });

  it('should not found an unexistent item', async () => {
    const repository = new BaseInMemoryRepository<Item>();

    await expect(repository.findById('1')).rejects.toThrowError(
      'Entity not found',
    );
  });

  it('should delete an item', async () => {
    const repository = new BaseInMemoryRepository<Item>();

    await repository.create({ id: '1', name: 'John Doe' });

    const item = await repository.deleteById('1');

    expect(item).toStrictEqual({ id: '1', name: 'John Doe' });
    expect(repository.items).toHaveLength(0);
  });

  it('should not delete an unexistent item', async () => {
    const repository = new BaseInMemoryRepository<Item>();

    await expect(repository.deleteById('1')).rejects.toThrowError(
      'Entity not found',
    );
  });
});
