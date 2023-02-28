import type { IDiscount } from './discount'

export interface ICalculateCosts {
  calculateDiscounts: (discounts: IDiscount[]) => void
  calculateTotalAmout: () => number
}
