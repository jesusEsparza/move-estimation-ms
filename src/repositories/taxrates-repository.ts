import { Service } from 'typedi'

@Service()
export class TaxRateRepository {
  private readonly data: Array<Record<string, any>> = [
    {
      tax_rate: 0.21,
      states: ['NY']
    }
  ]

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
