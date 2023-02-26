import 'reflect-metadata'
import Container from 'typedi'
import { MoveEstimation } from '../../src/models/move-estimation'
import CalculateMoveEstimation from '../../src/usecases/calculate-move-estimation'

describe('test calcule move estimation using normal estimation type', () => {
  const estimationType = 'normal'
  const baseAmount = 100
  const ISOStringDate = '2020-11-26T00:00:00.000Z'
  const mockedData = new Date(ISOStringDate)
  jest.spyOn(global, 'Date').mockImplementation(() => mockedData)

  it('calcule move estimation for NY', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('NY', estimationType, 25, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(151.25)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move estimation for CA not discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('CA', estimationType, 25, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(123)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move estimation for CA with discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('CA', estimationType, 27, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(116.85)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move estimation for AZ not discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('AZ', estimationType, 25, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(120)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move estimation for AZ with discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('AZ', estimationType, 27, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(114)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move estimation for TX not discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('TX', estimationType, 19, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(118)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move estimation for TX with 3% discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('TX', estimationType, 27, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(115)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move estimation for TX with 5% discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('TX', estimationType, 32, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(112.1)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move estimation for OH with 3% discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('OH', estimationType, 27, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    console.log(result)
    expect(result.total).toBe(112)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move estimation for OH with 5% discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('OH', estimationType, 32, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(109.25)
    expect(result.processed).toBe(ISOStringDate)
  })
})

describe('test calcule move estimation using premium estimation type', () => {
  const estimationType = 'premium'
  const baseAmount = 100
  const ISOStringDate = '2020-11-26T00:00:00.000Z'
  const mockedData = new Date(ISOStringDate)
  jest.spyOn(global, 'Date').mockImplementation(() => mockedData)

  it('calcule move premium estimation for NY not discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('NY', estimationType, 24, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(163.35)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move premium estimation for NY with 5% discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('NY', estimationType, 26, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(155.18)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move premium estimation for CA not discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('CA', estimationType, 24, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(133)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move premium estimation for CA with 5% discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('CA', estimationType, 26, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(126.35)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move premium estimation for AZ not discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('AZ', estimationType, 24, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(130)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move premium estimation for AZ with 5% discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('AZ', estimationType, 26, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(123.5)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move premium estimation for TX not discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('TX', estimationType, 24, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(128)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move premium estimation for TX with 5% discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('TX', estimationType, 26, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(121.6)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move premium estimation for OH not discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('OH', estimationType, 24, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(125)
    expect(result.processed).toBe(ISOStringDate)
  })

  it('calcule move premium estimation for OH with 5% discount', () => {
    const calculateMoveEstimation = Container.get(CalculateMoveEstimation)
    const estimation = new MoveEstimation('OH', estimationType, 26, baseAmount)
    const result = calculateMoveEstimation.execute(estimation)
    expect(result.total).toBe(118.75)
    expect(result.processed).toBe(ISOStringDate)
  })
})
