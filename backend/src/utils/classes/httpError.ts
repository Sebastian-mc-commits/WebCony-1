import errorCodes from '../../types/error.types'
import serverMessages from '../messages/server.messages.utils'

class HttpError extends Error {
  status: number
  errorCached: string
  errorCode: number
  constructor (message: string = serverMessages.SERVER_ERROR_500, status: number = 500, errorCached: string = 'No Error caught', errorCode: number = errorCodes.DEFAULT) {
    super(message)
    this.status = status
    this.errorCached = errorCached
    this.errorCode = errorCode
  }
}

export default HttpError
