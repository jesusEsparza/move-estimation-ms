export abstract class CustomException extends Error {
  abstract getStatusCode (): number
  abstract getErrorMessage (): string
}
