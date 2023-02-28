/** src/index.ts */
import 'dotenv/config'

import http from 'http'
import express, { type Express } from 'express'
import { queryParser } from 'express-query-parser'
import morgan from 'morgan'
import routes from './api/routes/estimations-route'
import ValidateSecureRequst from './api/middleware/validate-secure-request'
import ValidateIpClient from './api/middleware/validate-ip-address'

const router: Express = express()

/** Parse query parameters */
router.use(queryParser({
  parseNumber: true
}))

/** Logging */
router.use(morgan('dev'))

/** Parse URL enconded request */
router.use(express.urlencoded({ extended: false }))

/** Parse JSON request */
router.use(express.json())

/** Add validate to check ip client header */
router.use(ValidateIpClient)

/** Add validation to check ip key header */
router.use(ValidateSecureRequst)

/** routes */
router.use('/api', routes)

/** Error handling */
router.use((req, res, next) => {
  const error = new Error('not found')
  return res.status(404).json({
    message: error.message
  })
})

/** Server */
const httpServer = http.createServer(router)
const PORT: string = process.env?.PORT ?? '3030'
httpServer.listen(+PORT, () => { console.log(`The server is running on port ${PORT}`) })
