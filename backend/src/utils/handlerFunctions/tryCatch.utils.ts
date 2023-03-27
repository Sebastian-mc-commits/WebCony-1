import errorCodes from '../../types/error.types'
import HttpError from '../classes/httpError'
import serverMessages from '../messages/server.messages.utils'

const tryCatchHandler = ({ evaluateCode, fn }: { evaluateCode: number, fn: Function }): any => {
  try {
    return fn()
  } catch (err: any) {
    if (err.errorCode as number !== evaluateCode) {
      throw new HttpError(serverMessages.SERVER_ERROR_500, 500, err.message as string, errorCodes.SERVER_FAILURE)
    }
    throw new HttpError(err.message as string, err.status as number)
  }
}

export default tryCatchHandler
