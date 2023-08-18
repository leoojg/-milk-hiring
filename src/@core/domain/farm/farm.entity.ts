import { ObjectId } from 'mongodb';

export type FarmProps = {
  name: string;
  farmerId: string;
};

export class Farm {
  public readonly id: string;
  private props: FarmProps;

  constructor(props: FarmProps, id?: string) {
    this.id = id || new ObjectId().toString();
    this.props = props;
  }

  public get farmerId(): string {
    return this.props.farmerId;
  }

  public get name(): string {
    return this.props.name;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
