import { Service } from "typedi";
import { IDiscount } from "../interfaces/discount";

@Service()
export class DiscountsRepository
{
    private data: IDiscount[] = [
        { 
            description: 'Apply 5% discount over the base amount plus commission for movig distances great than 26 km. Only for Normal estimations.', 
            rule: 'this.getMovingDistance() > 26', 
            discount: '(this.getBaseAmount() + this.getCommissionRate()) * 0.05',
            estimationType: 'normal',
            states: ['CA', 'AZ'], 
        },
        { 
            description: 'Apply 3% discount over the base amount for movig distances between 20 km. and 30 km. Only for Normal estimations.', 
            rule: 'this.getMovingDistance() >= 20 && this.getMovingDistance() <= 30',
            discount: 'this.getBaseAmount() * 0.03', 
            estimationType: 'normal',
            states: ['TX', 'OH'], 
        },
        { 
            description: 'Apply 5% discount over the base amount plus commission for movig distances great than 30 km. Only for Normal estimations.', 
            rule: 'this.getMovingDistance() > 30', 
            discount: '(this.getBaseAmount() + this.getCommissionRate()) * 0.05',
            estimationType: 'normal',
            states: ['TX', 'OH'], 
        },
        { 
            description: 'Apply 5% discount over the base amount plus commission for movig distances great than 25 km. Only for Premium estimations.', 
            rule: 'this.getMovingDistance() > 25', 
            discount: '(this.getBaseAmount() + this.getCommissionRate()) * 0.05',
            estimationType: 'premium',
            states: ['*'],
        },
    ]
    getDiscounts(state: string, estimationType: string) : IDiscount[]
    {
        return this.data.filter((i) => i.estimationType == estimationType && (i.states.includes(state) || i.states[0] == '*' ) );
    }
}