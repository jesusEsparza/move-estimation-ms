import { Service } from 'typedi'

/**
 * Repository class to implement Tax rates settings data source access.
 * @public
 */
@Service()
export class TaxRateRepository {
  /**
   * @private
   * Tax rates config
   *
   * This array of objects is used as repository of tax rates applicable by US State.
   *
   */
  private readonly data: Array<Record<string, any>> = [
    {
      tax_rate: 0.21,
      states: ['NY']
    }
  ]

  /**
   * @public
   * Get the applicable Tax rate by US State.
   *
   * @param {string} state - US State Abbreviation
   * @returns {number} % Tax rate
   *
   */
  getTaxRate (state: string): number {
    const item = this.data.find(
      (i) => (Boolean(i.states.includes(state))) || i.states[0] === '*'
    )
    if (item == null) {
      return 0
    }
    return item.tax_rate
  }
}
