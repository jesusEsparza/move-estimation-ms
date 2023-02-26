import { IDiscount } from "./discount";

export interface ICalculateCosts {
    calculateDiscounts(discounts: IDiscount[]) : void;
    CalculateTotalAmout() : number;
}