
export interface IDiscountRule {
  /**
   * @public
   * Evaluate if an estimation matches with this discount.
   * @returns {number}
   *
   */
  matches: () => boolean
  /**
   * @public
   * Apply the discount to the move estimation.
   * @returns {number}
   *
   */
  execute: () => number
}
