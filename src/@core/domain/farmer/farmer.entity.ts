import { generateObjectId } from '../../../@common/util';

export type FarmerProps = {
  name: string;
};

export class Farmer {
  public readonly id: string;
  private props: FarmerProps;

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
