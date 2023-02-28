/** src/api/controllers/estimations-controller.ts */
import { type Request, type Response, type NextFunction } from 'express'
import { type EstimationRequest } from '../schemas/schema_definition'

import 'reflect-metadata'
import Container from 'typedi'
import CalculateMoveEstimation from '../../app/usecases/calculate-move-estimation'
import { CustomException } from '../../app/exceptions/custom-exception'

// getting a move estimation
const getMoveEstimation = async (req: Request<any, any, any, EstimationRequest>, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const result = calculateMoveEstimation.execute(req.query)
    return res.status(200).json(result)
  } catch (err) {
    console.debug(err)
    if (err instanceof CustomException) {
      return res.status(err.getStatusCode()).json({ message: err.getErrorMessage() })
    }
    return res.status(500).json({ message: 'unexpected error' })
  }
}

export default { getMoveEstimation }
