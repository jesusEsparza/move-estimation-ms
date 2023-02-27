import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
import { type NextFunction } from 'express'
const ajv = new Ajv({ allErrors: true })
ajvErrors(ajv)

// validation middleware
export default function ValidateEstimationRequest (schema: object): any {
  const validate = ajv.compile(schema)
  return (req: any, res: any, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    if (!validate(req.query)) {
      return res.status(400).json(validate.errors?.map(e => { return { parameter: e.instancePath, message: e.message } }))
    }
    next()
  }
}
