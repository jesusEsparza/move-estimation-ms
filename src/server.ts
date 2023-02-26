import 'reflect-metadata';
import Container from 'typedi';
import { MoveEstimation } from './models/move-estimation';

import CalculateMoveEstimation from './usecases/calculate-move-estamation';

let calculateMoveEstimation = Container.get(CalculateMoveEstimation);
const estimation = new MoveEstimation('TX', 'premium', 35, 100);
console.log(calculateMoveEstimation.execute(estimation));