import { ObjectId } from 'mongodb';

export type FarmerProps = {
  name: string;
};

export class Farmer {
  public readonly id: string;
  private props: FarmerProps;

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

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
