
export class HTMLResponseError extends Error {
  public constructor () {
    super('Useless HTML response')
    Error.captureStackTrace(this, this.constructor)
  }
}
