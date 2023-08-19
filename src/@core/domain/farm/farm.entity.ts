import { generateObjectId } from '../../../@common/util';

export type FarmProps = {
  name: string;
  farmerId: string;
  distanceToFactory: number;
};

export class Farm {
  public readonly id: string;
  private props: FarmProps;

  constructor(props: FarmProps, id?: string) {
    this.id = id || generateObjectId();
    this.props = props;
  }

  public get farmerId(): string {
    return this.props.farmerId;
  }

  public get name(): string {
    return this.props.name;
  }

  public get distanceToFactory(): number {
    return this.props.distanceToFactory;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
