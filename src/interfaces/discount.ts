import { type IDiscountRule } from './discount-rule'

export interface IDiscount {
  description: string
  rule: string
  estimationType: string
  states: string[]
  discountRule?: IDiscountRule
}
