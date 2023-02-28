import { type IDiscountRule } from '../interfaces/discount-rule'
import { type Estimation } from '../models/estimation'

/**
 * Discount rule class that implement a interface to evaluate
 * the discount and get the amount of the discount.
 * @public
 */
export class DiscountRuleA implements IDiscountRule {
  private readonly estimation: Estimation
  constructor (estimation: Estimation) {
    this.estimation = estimation
  }

  public matches (): boolean {
    return this.estimation.getMovingDistance() > 26
  }

  public execute (): number {
    return this.estimation.getSubtotal() * 0.05
  }
}
