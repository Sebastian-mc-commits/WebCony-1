import { Request, Response, NextFunction } from 'express'
import errorCodes from '../../types/error.types'
import HttpError from '../../utils/classes/httpError'
import serverMessages from '../../utils/messages/server.messages.utils'

const errorHandler = (err: HttpError | Error, _req: Request, res: Response, _next: NextFunction): Response => {
  console.log('Passing throught the middleware')

  let displayMessage: object = {
    message: serverMessages.SERVER_ERROR_500,
    status: 500,
    error: err.message,
    code: errorCodes.SERVER_FAILURE
  }

  if (err instanceof HttpError) {
    displayMessage = {
      message: err.message,
      status: err?.status,
      error: err.errorCached,
      code: err.errorCode
    }
  }

  return res.json(displayMessage)
}

export default errorHandler
