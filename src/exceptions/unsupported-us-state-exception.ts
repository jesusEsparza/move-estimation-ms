import { CustomException } from './custom-exception'

export class UnsupportedUSStateException extends CustomException {
  private readonly statusCode: number = 422

  constructor (message?: string) {
    super(message)

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, UnsupportedUSStateException.prototype)
  }

  public getStatusCode (): number {
    return this.statusCode
  }

  public getErrorMessage (): string {
    return 'Unsupported US State'
  }
}
