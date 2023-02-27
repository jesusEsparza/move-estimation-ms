/** src/api/routes/estimations-route.ts */
import express from 'express'
import controller from '../controllers/estimations-controller'
import _schema from '../schemas/_schema'
import ValidateEstimationRequest from '../middleware/validate-estimation-request'
const router = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/move/estimation', ValidateEstimationRequest(_schema.EstimationRequest), controller.getMoveEstimation)

export = router
