/**
 * CustomException abstract class to be used to return custom error messages.
 * @abstract
 */
export abstract class CustomException extends Error {
  /**
   * @public
   * Get custom exception status code
   * @returns {number}
   *
   */
  abstract getStatusCode (): number
  /**
   * @public
   * Get custom exception error message
   * @returns {number}
   *
   */
  abstract getErrorMessage (): string
}
