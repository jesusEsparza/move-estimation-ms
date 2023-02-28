import { Service } from 'typedi'
import { type IDiscount } from '../interfaces/discount'

/**
 * Repository class to implement Discounts settings data source access.
 * @public
 */
@Service()
export class DiscountsRepository {
  /**
   * @private
   * Applicable discounts.
   *
   * This array of objects is used as repository of discounts to be applicated.
   * Using this configuration and admin user can set discounts by US State or Estimation Type
   * and specify the rules to evaluate the conditions to check if it could be applicated.
   *
   */
  private readonly data: IDiscount[] = [
    {
      description:
        'Apply 5% discount over the base amount plus commission for movig distances great than 26 km. Only for Normal estimations.',
      rule: 'DiscountRuleA',
      estimationType: 'normal',
      states: ['CA', 'AZ']
    },
    {
      description:
        'Apply 3% discount over the base amount for movig distances between 20 km. and 30 km. Only for Normal estimations.',
      rule: 'DiscountRuleB',
      estimationType: 'normal',
      states: ['TX', 'OH']
    },
    {
      description:
        'Apply 5% discount over the base amount plus commission for movig distances great than 30 km. Only for Normal estimations.',
      rule: 'DiscountRuleC',
      estimationType: 'normal',
      states: ['TX', 'OH']
    },
    {
      description:
        'Apply 5% discount over the base amount plus commission for movig distances great than 25 km. Only for Premium estimations.',
      rule: 'DiscountRuleD',
      estimationType: 'premium',
      states: ['*']
    }
  ]

  /**
   * @public
   * Get the applicable discounts by US State and Estimation Type.
   *
   * This method filter the available discounts to be evaluated
   * and determinte the amount of discounts.
   *
   * @param {string} state - US State Abbreviation
   * @param {string} estimationType - Estimation Type: Normal or Premium
   * @returns {array} Applicable discounts.
   *
   */
  public getDiscounts (state: string, estimationType: string): IDiscount[] {
    return this.data.filter(
      (i) =>
        i.estimationType === estimationType &&
        (i.states.includes(state) || i.states[0] === '*')
    )
  }
}
