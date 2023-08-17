import { ObjectId } from 'mongodb';

export type FarmerProps = {
  name: string;
};

export class Farmer {
  private readonly id: string;
  public props: FarmerProps;

  constructor(props: FarmerProps, id?: string) {
    this.id = id || new ObjectId().toString();
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  create(props: FarmerProps, id?: string) {
    return new Farmer(props, id);
  }

  updateName(name: string) {
    this.name = name;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
