export abstract class PriceEvaluationInterface {
  static firstSemester: {
    basePrice: number;
    costPerKilometer: number;
    costPerKilometerAbove: number;
    kilometerFeeAbove: number;
    productionBonus: number;
    productionBonusAmount: number;
  };
  static secondSemester: {
    basePrice: number;
    costPerKilometer: number;
    costPerKilometerAbove: number;
    kilometerFeeAbove: number;
    productionBonus: number;
    productionBonusAmount: number;
  };
}

export class PriceEvaluation implements PriceEvaluationInterface {
  static firstSemester = {
    basePrice: 1.8,
    costPerKilometer: 0.05,
    costPerKilometerAbove: 0.1,
    kilometerFeeAbove: 50,
    productionBonus: 0,
    productionBonusAmount: 0,
  };
  static secondSemester = {
    basePrice: 1.95,
    costPerKilometer: 0,
    costPerKilometerAbove: 0,
    kilometerFeeAbove: 0,
    productionBonus: 0.01,
    productionBonusAmount: 10000,
  };
}
