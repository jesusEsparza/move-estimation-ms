import 'reflect-metadata'
import Container from 'typedi'
import { MoveEstimation } from './models/move-estimation'

import CalculateMoveEstimation from './usecases/calculate-move-estimation'

let calculateMoveEstimation = Container.get(CalculateMoveEstimation)
const estimation = new MoveEstimation('TX', 'normal', 25, 100)
console.log(calculateMoveEstimation.execute(estimation))
