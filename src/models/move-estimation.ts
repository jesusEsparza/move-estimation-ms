import { type ICalculateCosts } from '../interfaces/calculate-costs'
import { type IDiscount } from '../interfaces/discount'
import { Estimation } from './estimation'
import { Rules } from '../rules'

/**
 * Class to apply bussiness rules to calculate move estimation.
 * This Class extends the abstract class Estimation to use it as data model
 * and implement the interfase to calculate the costs.
 * @public
 */
export class MoveEstimation extends Estimation implements ICalculateCosts {
  /**
   * @public
   * Calculate move discountes
   *
   * This method receive a discounts array with rules to be evaluated to
   * determine if the move estimation request apply discounts by US State, Estimation Type and Distance
   *
   * @param discounts - The discounts array to be evaluated.
   * @returns
   *
   */
  public calculateDiscounts (discounts: IDiscount[]): void {
    discounts.forEach((item) => {
      item.discountRule = new Rules[item.rule](this)
    })
    const value = discounts
      .filter((item) => item.discountRule?.matches())
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .reduce((sum, item) => sum + item.discountRule!.execute(), 0)

    this.setDiscounts(value)
  }

  /**
   * @public
   * Calculate the total amount.
   *
   * This method result in the aritmethic calculation to get
   * the subtotal (base amount + % commission) and apply discounts
   * and add taxs if it is applicable.
   *
   * @param discounts - The discounts array to be evaluated.
   * @returns
   *
   */
  public calculateTotalAmout (): number {
    return (this.getSubtotal() - this.getDiscounts()) * (1 + this.getTaxRate())
  }
}
