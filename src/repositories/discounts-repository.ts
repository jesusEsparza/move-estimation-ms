import { Service } from 'typedi'
import { type IDiscount } from '../interfaces/discount'

@Service()
export class DiscountsRepository {
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

  getDiscounts (state: string, estimationType: string): IDiscount[] {
    return this.data.filter(
      (i) =>
        i.estimationType === estimationType &&
        (i.states.includes(state) || i.states[0] === '*')
    )
  }
}
