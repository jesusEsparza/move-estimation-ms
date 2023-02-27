import { type NextFunction } from 'express'
import { isIP } from 'net'

// Validate expected API Key
export default function ValidateIpClient (req: any, res: any, next: NextFunction): any {
  const ipClient = req.headers['ip-client']
  if (isIP(ipClient) === 0) return res.status(403).json({ message: 'invalid ip client' })
  next()
}
