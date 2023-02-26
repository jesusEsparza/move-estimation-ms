import { type ICalculateCosts } from '../interfaces/calculate-costs'
import { type IDiscount } from '../interfaces/discount'
import { Estimation } from './estimation'
import { Rules } from '../rules'

export class MoveEstimation extends Estimation implements ICalculateCosts {
  calculateDiscounts (discounts: IDiscount[]): void {
    discounts.forEach((item) => {
      item.discountRule = new Rules[item.rule](this)
    })
    const value = discounts
      .filter((item) => item.discountRule?.matches())
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .reduce((sum, item) => sum + item.discountRule!.execute(), 0)

    this.setDiscounts(value)
  }

  calculateTotalAmout (): number {
    return (this.getSubtotal() - this.getDiscounts()) * (1 + this.getTaxRate())
  }
}
