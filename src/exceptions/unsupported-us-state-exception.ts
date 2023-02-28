import { CustomException } from './custom-exception'

/**
 * UnsupportedUSStateException implements CustomException abstract class
 * to return an error message with a status code.
 * @public
 */
export class UnsupportedUSStateException extends CustomException {
  private readonly statusCode: number = 422

  constructor (message?: string) {
    super(message)

    Object.setPrototypeOf(this, UnsupportedUSStateException.prototype)
  }

  public getStatusCode (): number {
    return this.statusCode
  }

  public getErrorMessage (): string {
    return 'Unsupported US State'
  }
}
