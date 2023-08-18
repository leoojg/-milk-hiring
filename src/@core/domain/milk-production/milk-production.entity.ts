import { generateObjectId } from '../../../@common/util';

export type MilkProductionProps = {
  farmId: string;
  date: Date;
  amount: number;
};

export class MilkProduction {
  public readonly id: string;
  private props: MilkProductionProps;

  constructor(props: MilkProductionProps, id?: string) {
    this.id = id || generateObjectId();
    this.props = props;
  }

  public get farmId(): string {
    return this.props.farmId;
  }

  public get date(): Date {
    return this.props.date;
  }

  public get amount(): number {
    return this.props.amount;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
