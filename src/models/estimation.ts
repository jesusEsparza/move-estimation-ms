export abstract class Estimation
{
    private state: string;
    private estimationType: string;
    private movingDistance: number;
    private baseAmount: number;
    private commissionRate: number = 0;
    private discounts: number = 0;
    private taxRate: number = 0;

    constructor (state: string, estimationType: string, movingDistance: number, baseAmount: number) {
        this.state = state;
        this.estimationType = estimationType;
        this.movingDistance = movingDistance;
        this.baseAmount = baseAmount;
    }

    public getState (): string {
        return this.state;
    }
    
    public getEstimationType (): string {
        return this.estimationType;
    }

    public getMovingDistance (): number {
        return this.movingDistance;
    }

    public getBaseAmount (): number {
        return this.baseAmount;
    }

    public getCommissionRate(): number {
        return this.commissionRate;
    }

    public setCommissionRate(value: number) {
        this.commissionRate = value;
    }

    public getDiscounts(): number {
        return this.discounts;
    }

    public setDiscounts(value: number) {
        this.discounts = value;
    }

    public setTaxRate(rate: number) {
        this.taxRate = rate;
    }

    public getTaxRate(): number {
        return this.taxRate;
    }
} 