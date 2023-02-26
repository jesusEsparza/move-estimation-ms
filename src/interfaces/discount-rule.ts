
export interface IDiscountRule {
  matches: () => boolean
  execute: () => number
}
