import { Service } from 'typedi'
import { type EstimationRequest } from '../api/schemas/schema_definition'
import { type IEstimationResult } from '../interfaces/estimation-result'
import { MoveEstimation } from '../models/move-estimation'
import { CommissionRepository } from '../repositories/commissions-repository'
import { DiscountsRepository } from '../repositories/discounts-repository'
import { TaxRateRepository } from '../repositories/taxrates-repository'

/**
 * Calculate Move Estimation Use Case
 * @public
 */
@Service()
class CalculateMoveEstimation {
  _request!: MoveEstimation
  constructor (
    private readonly commissionRepository: CommissionRepository,
    private readonly discountsRepository: DiscountsRepository,
    private readonly taxRatesRepository: TaxRateRepository
  ) {}

  /**
   * @public
   * Execute the move estimation cost
   *
   * @param request - The move estimation request parameter
   * @returns The move estimation cost and the date was processed the request.
   *
   */
  public execute (request: EstimationRequest): IEstimationResult {
    this._request = new MoveEstimation(request.state, request.estimation, request.distance, request.base_amount)
    const total = this.getApplicableCommission()
      .calculateDiscounts()
      .getTaxRate()
      .getTotalAmount()
    return {
      total: +total.toFixed(2),
      processed: (new Date()).toISOString()
    }
  }

  /**
   * @private
   * Get the applicable commision by US State and Estimation type: normal or premium
   *
   * @returns {Object} CalculateMoveEstimation
   *
   */
  private getApplicableCommission (): CalculateMoveEstimation {
    const value = this.commissionRepository.getCommission(
      this._request.getState(),
      this._request.getEstimationType()
    )
    this._request.setCommissionRate(value)
    return this
  }

  /**
   * @private
   * Get the discounts by US State and Estimation type: normal or premium and calculate the total of them.
   *
   * @returns {Object} CalculateMoveEstimation
   *
   */
  private calculateDiscounts (): CalculateMoveEstimation {
    const items = this.discountsRepository.getDiscounts(
      this._request.getState(),
      this._request.getEstimationType()
    )
    this._request.calculateDiscounts(items)
    return this
  }

  /**
   * @private
   * Get the tax rate by US State.
   *
   * @returns {Object} CalculateMoveEstimation
   *
   */
  private getTaxRate (): CalculateMoveEstimation {
    const value = this.taxRatesRepository.getTaxRate(this._request.getState())
    this._request.setTaxRate(value)
    return this
  }

  /**
   * @private
   * Get total amount of the move estimation cost with discounts and taxs.
   *
   * @returns {Object} CalculateMoveEstimation
   *
   */
  private getTotalAmount (): number {
    return this._request.calculateTotalAmout()
  }
}

export default CalculateMoveEstimation
