import { Service } from "typedi";

@Service()
export class CommissionRepository
{
    private data: {[key: string]: any}[] = [
        { state: 'NY', normal: .25, premium: .35 },
        { state: 'CA', normal: .23, premium: .33 },
        { state: 'AZ', normal: .20, premium: .30 },
        { state: 'TX', normal: .18, premium: .28 },
        { state: 'OH', normal: .15, premium: .25 },
    ]
    getCommission(state: string, estimationType: string) : number
    {
        const item = this.data.find((i) => i.state == state) || {};
        return item[estimationType];
    }
}