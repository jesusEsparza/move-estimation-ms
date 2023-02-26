import { ICalculateCosts } from "../interfaces/calculate-costs";
import { IDiscount } from "../interfaces/discount";
import { Estimation } from "./estimation";

export class MoveEstimation extends Estimation implements ICalculateCosts {
    calculateDiscounts(discounts: IDiscount[]) {
        const value = discounts
            .filter(item => eval(item.rule))
            .reduce((sum, item) => sum + eval(item.discount), 0);

        this.setDiscounts(value);
    }
   
    CalculateTotalAmout(): number {
        return (this.getBaseAmount() * (1 + this.getCommissionRate()) - this.getDiscounts()) * (1 + this.getTaxRate());
    }
}