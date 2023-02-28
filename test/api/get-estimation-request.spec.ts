import request from 'supertest'
import router from '../../src/router'
import { UnsupportedUSStateException } from '../../src/app/exceptions/unsupported-us-state-exception'
import CalculateMoveEstimation from '../../src/app/usecases/calculate-move-estimation'

describe('Move estimation endpoint', () => {
  const apiKey: string = 'abc123'
  process.env.API_KEY = apiKey

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a 200 status code', async () => {
    const getStatusCodeMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getStatusCode')
    const getErrorMessageMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getErrorMessage')
    const res = await request(router)
      .get('/api/move/estimation?state=NY&estimation=normal&distance=25&base_amount=100')
      .set('ip-client', '127.0.0.1')
      .set('x-api-key', apiKey)
      .send()
    expect(res.statusCode).toEqual(200)
    expect(getStatusCodeMock).toBeCalledTimes(0)
    expect(getErrorMessageMock).toBeCalledTimes(0)
  })

  it('should return a 400 status code', async () => {
    const getStatusCodeMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getStatusCode')
    const getErrorMessageMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getErrorMessage')
    const res = await request(router)
      .get('/api/move/estimation?state=NY&estimation=normalxx&distance=25&base_amount=100')
      .set('ip-client', '127.0.0.1')
      .set('x-api-key', apiKey)
      .send()
    expect(res.statusCode).toEqual(400)
    expect(getStatusCodeMock).toBeCalledTimes(0)
    expect(getErrorMessageMock).toBeCalledTimes(0)
  })

  it('should return a 401 status code, invalid api key', async () => {
    const getStatusCodeMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getStatusCode')
    const getErrorMessageMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getErrorMessage')    
    const res = await request(router)
      .get('/api/cost/estimation?state=NY&estimation=normal&distance=25&base_amount=100')
      .set('ip-client', '127.0.0.1')
      .set('x-api-key', '000')
      .send()
    expect(res.statusCode).toEqual(401)
    expect(getStatusCodeMock).toBeCalledTimes(0)
    expect(getErrorMessageMock).toBeCalledTimes(0)
  })

  it('should return a 403 status code, invalid ip address', async () => {
    const getStatusCodeMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getStatusCode')
    const getErrorMessageMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getErrorMessage')    
    const res = await request(router)
      .get('/api/cost/estimation?state=NY&estimation=normal&distance=25&base_amount=100')
      .set('ip-client', '127.0.0.500')
      .set('x-api-key', apiKey)
      .send()
    expect(res.statusCode).toEqual(403)
    expect(getStatusCodeMock).toBeCalledTimes(0)
    expect(getErrorMessageMock).toBeCalledTimes(0)
  })

  it('should return a 404 status code', async () => {
    const getStatusCodeMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getStatusCode')
    const getErrorMessageMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getErrorMessage')    
    const res = await request(router)
      .get('/api/cost/estimation?state=NY&estimation=normal&distance=25&base_amount=100')
      .set('ip-client', '127.0.0.1')
      .set('x-api-key', apiKey)
      .send()
    expect(res.statusCode).toEqual(404)
    expect(getStatusCodeMock).toBeCalledTimes(0)
    expect(getErrorMessageMock).toBeCalledTimes(0)
  })

  it('should return a 422 status code', async () => {
    const getStatusCodeMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getStatusCode')
    const getErrorMessageMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getErrorMessage')
    const res = await request(router)
      .get('/api/move/estimation?state=NJ&estimation=normal&distance=25&base_amount=100')
      .set('ip-client', '127.0.0.1')
      .set('x-api-key', apiKey)
      .send()
    expect(res.statusCode).toEqual(422)
    expect(getStatusCodeMock).toBeCalledTimes(1)
    expect(getErrorMessageMock).toBeCalledTimes(1)
  })

  it('should return a 500 status code', async () => {
    const getStatusCodeMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getStatusCode')
    const getErrorMessageMock = jest.spyOn(UnsupportedUSStateException.prototype, 'getErrorMessage')
    jest.spyOn(CalculateMoveEstimation.prototype, 'execute').mockImplementation(() => { throw new Error() })
    const res = await request(router)
      .get('/api/move/estimation?state=NJ&estimation=normal&distance=25&base_amount=100')
      .set('ip-client', '127.0.0.1')
      .set('x-api-key', apiKey)
      .send()
    expect(res.statusCode).toEqual(500)
    expect(getStatusCodeMock).toBeCalledTimes(0)
    expect(getErrorMessageMock).toBeCalledTimes(0)
  })
})
