/**
 * Estimation Model Abstract calss
 * @public
 */
export abstract class Estimation {
  private readonly state: string
  private readonly estimationType: string
  private readonly movingDistance: number
  private readonly baseAmount: number
  private commissionRate: number = 0
  private discounts: number = 0
  private taxRate: number = 0

  constructor (
    state: string,
    estimationType: string,
    movingDistance: number,
    baseAmount: number
  ) {
    this.state = state
    this.estimationType = estimationType
    this.movingDistance = movingDistance
    this.baseAmount = baseAmount
  }

  public getState (): string {
    return this.state
  }

  public getEstimationType (): string {
    return this.estimationType
  }

  public getMovingDistance (): number {
    return this.movingDistance
  }

  public getBaseAmount (): number {
    return this.baseAmount
  }

  public getCommissionRate (): number {
    return this.commissionRate
  }

  public setCommissionRate (value: number): void {
    this.commissionRate = value
  }

  public getDiscounts (): number {
    return this.discounts
  }

  public setDiscounts (value: number): void {
    this.discounts = value
  }

  public setTaxRate (rate: number): void {
    this.taxRate = rate
  }

  public getTaxRate (): number {
    return this.taxRate
  }

  public getSubtotal (): number {
    return this.getBaseAmount() * (1 + this.getCommissionRate())
  }
}
