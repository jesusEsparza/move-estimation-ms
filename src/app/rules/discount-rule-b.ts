import { type IDiscountRule } from '../interfaces/discount-rule'
import { type Estimation } from '../models/estimation'

/**
 * Discount rule class that implement a interface to evaluate
 * the discount and get the amount of the discount.
 * @public
 */
export class DiscountRuleB implements IDiscountRule {
  private readonly estimation: Estimation
  constructor (estimation: Estimation) {
    this.estimation = estimation
  }

  matches (): boolean {
    return this.estimation.getMovingDistance() >= 20 && this.estimation.getMovingDistance() <= 30
  }

  execute (): number {
    return this.estimation.getBaseAmount() * 0.03
  }
}
