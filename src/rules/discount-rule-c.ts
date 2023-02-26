import { type IDiscountRule } from '../interfaces/discount-rule'
import { type Estimation } from '../models/estimation'

export class DiscountRuleC implements IDiscountRule {
  private readonly estimation: Estimation
  constructor (estimation: Estimation) {
    this.estimation = estimation
  }

  matches (): boolean {
    return this.estimation.getMovingDistance() > 30
  }

  execute (): number {
    return this.estimation.getSubtotal() * 0.05
  }
}
