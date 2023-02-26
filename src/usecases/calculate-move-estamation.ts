import { Service } from "typedi";
import { MoveEstimation } from "../models/move-estimation";
import { CommissionRepository } from "../repositories/commissions-repository";
import { DiscountsRepository } from "../repositories/discounts-repository";
import { TaxRateRepository } from "../repositories/taxrates-repository";

@Service()
class CalculateMoveEstimation {
    _request!: MoveEstimation;
    constructor(
        private readonly commissionRepository: CommissionRepository,
        private readonly discountsRepository: DiscountsRepository,
        private readonly taxRatesRepository: TaxRateRepository
    ) { }

    public execute(request: MoveEstimation) {
        this._request = request;
        return this
            .getApplicableCommission()
            .calculateDiscounts()
            .getTaxRate()
            .getTotalAmount();
    }

    private getApplicableCommission() {
        const value = this.commissionRepository.getCommission(this._request.getState(), this._request.getEstimationType());
        this._request.setCommissionRate(value);
        return this;
    }

    private calculateDiscounts() {
        const items = this.discountsRepository.getDiscounts(this._request.getState(), this._request.getEstimationType());
        this._request.calculateDiscounts(items);
        return this;
    }

    private getTaxRate() {
        const value = this.taxRatesRepository.getTaxRate(this._request.getState());
        this._request.setTaxRate(value);
        return this;
    }

    private getTotalAmount() {
        return this._request.CalculateTotalAmout();
    }
}

export default CalculateMoveEstimation;