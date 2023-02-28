/** Server */
import http from 'http'
import router from './router'

const httpServer = http.createServer(router)
const PORT: string = process.env?.PORT ?? '3030'
httpServer.listen(+PORT, () => { console.log(`The server is running on port ${PORT}`) })
