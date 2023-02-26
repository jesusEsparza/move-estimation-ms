import { Service } from "typedi";

@Service()
export class TaxRateRepository
{
    private data: {[key: string]: any}[] = [
        { 
            tax_rate: 0.21,
            states: ['NY'], 
        }
    ]
    getTaxRate(state: string) : number
    {
        const item = this.data.find((i) => i.states.includes(state) || i.states[0] == '*'  );
        return item?.tax_rate || 0;
    }
}