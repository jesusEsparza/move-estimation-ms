import { Service } from 'typedi'
import { UnsupportedUSStateException } from '../exceptions/unsupported-us-state-exception'
type CommmissionType = Record<string, any>

@Service()
export class CommissionRepository {
  private readonly data: CommmissionType[] = [
    { state: 'NY', normal: 0.25, premium: 0.35 },
    { state: 'CA', normal: 0.23, premium: 0.33 },
    { state: 'AZ', normal: 0.2, premium: 0.3 },
    { state: 'TX', normal: 0.18, premium: 0.28 },
    { state: 'OH', normal: 0.15, premium: 0.25 }
  ]

  getCommission (state: string, estimationType: string): number {
    const item = this.data.find((i) => i.state === state)
    if (item == null) {
      throw new UnsupportedUSStateException()
    }

    return item[estimationType]
  }
}
