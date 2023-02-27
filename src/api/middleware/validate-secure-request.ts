import { type NextFunction } from 'express'

// Validate expected API Key
export default function ValidateSecureRequst (req: any, res: any, next: NextFunction): any {
  const apiKey = req.headers['x-api-key']
  if (apiKey !== process.env.API_KEY) return res.status(401).json({ message: 'Unauthorized request' })
  next()
}
