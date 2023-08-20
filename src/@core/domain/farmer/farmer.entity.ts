import { TEntity } from 'src/@common/base.repository';
import { generateObjectId } from '../../../@common/util';

export type FarmerProps = {
  name: string;
};

export class Farmer implements TEntity {
  public readonly id: string;
  private props: FarmerProps;

  static create(entity: Record<string, unknown>, id?: string): Farmer {
    return new Farmer(entity as FarmerProps, id);
  }

  constructor(props: FarmerProps, id?: string) {
    this.id = id || generateObjectId();
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
