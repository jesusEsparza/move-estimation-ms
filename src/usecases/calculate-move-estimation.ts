import { Service } from 'typedi'
import { type IEstimationResult } from '../interfaces/estimation-result'
import { type MoveEstimation } from '../models/move-estimation'
import { CommissionRepository } from '../repositories/commissions-repository'
import { DiscountsRepository } from '../repositories/discounts-repository'
import { TaxRateRepository } from '../repositories/taxrates-repository'

@Service()
class CalculateMoveEstimation {
  _request!: MoveEstimation
  constructor (
    private readonly commissionRepository: CommissionRepository,
    private readonly discountsRepository: DiscountsRepository,
    private readonly taxRatesRepository: TaxRateRepository
  ) {}

  public execute (request: MoveEstimation): IEstimationResult {
    this._request = request
    const total = this.getApplicableCommission()
      .calculateDiscounts()
      .getTaxRate()
      .getTotalAmount()
    return {
      total: +total.toFixed(2),
      processed: (new Date()).toISOString()
    }
  }

  private getApplicableCommission (): CalculateMoveEstimation {
    const value = this.commissionRepository.getCommission(
      this._request.getState(),
      this._request.getEstimationType()
    )
    this._request.setCommissionRate(value)
    return this
  }

  private calculateDiscounts (): CalculateMoveEstimation {
    const items = this.discountsRepository.getDiscounts(
      this._request.getState(),
      this._request.getEstimationType()
    )
    this._request.calculateDiscounts(items)
    return this
  }

  private getTaxRate (): CalculateMoveEstimation {
    const value = this.taxRatesRepository.getTaxRate(this._request.getState())
    this._request.setTaxRate(value)
    return this
  }

  private getTotalAmount (): number {
    return this._request.calculateTotalAmout()
  }
}

export default CalculateMoveEstimation
