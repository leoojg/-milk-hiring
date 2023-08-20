import { TEntity } from 'src/@common/base.repository';
import { generateObjectId } from '../../../@common/util';

export type MilkProductionProps = {
  farmId: string;
  date: Date;
  amount: number;
};

export class MilkProduction implements TEntity {
  public readonly id: string;
  private props: MilkProductionProps;

  constructor(props: MilkProductionProps, id?: string) {
    this.id = id || generateObjectId();
    this.props = props;
  }

  static create(entity: Record<string, unknown>, id?: string): MilkProduction {
    return new MilkProduction(entity as MilkProductionProps, id);
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
