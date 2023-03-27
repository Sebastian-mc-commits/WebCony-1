import { FoodItemTypes } from '../types/foodItem.types'
import { Roles } from '../types/role.types'
import { UserValueTypes } from '../types/user.types'
import HttpError from './classes/httpError'
import { emailRegex, passwordRegex } from './consts/regex.const'
import foodItemMessages from './messages/foodItems.messages.utils'
import userMessages from './messages/user.messages.utils'
import { isInteger, isString } from './parsePrimitiveTypes.utils'

const validateParseValues = (value: any, type: string): boolean => {
  const { Email, Id, Name, Password, Role } = UserValueTypes
  const { Quantity, Price, Status } = FoodItemTypes

  switch (type) {
    case Email:
    {
      if (!isString(value)) throw new HttpError(userMessages.SINTAX_ERROR_EMAIL, 400)
      else if (!emailRegex.test(value)) throw new HttpError(userMessages.EMAIL_ERROR, 400)
      break
    }
    case Id:
    {
      if (!isInteger(value)) throw new HttpError(userMessages.SINTAX_ERROR_ID, 400)
      break
    }
    case Name:
    {
      if (!isString(value)) throw new HttpError(userMessages.SINTAX_ERROR_NAME, 400)
      else if (Name.length <= 3) throw new HttpError(userMessages.NAME_ERROR, 400)
      break
    }
    case Password:
    {
      if (!isString(value)) throw new HttpError(userMessages.SINTAX_ERROR_PASSWORD, 400)
      else if (!passwordRegex.test(value)) throw new HttpError(userMessages.PASSWORD_ERROR, 400)
      break
    }
    case Role:
    {
      if (value === undefined) break
      else if (!isString(value)) throw new HttpError(userMessages.SINTAX_ERROR_ROLE, 400)
      else if (!Object.values(Roles).includes(value)) throw new HttpError(userMessages.ROLE_ERROR, 400)
      break
    }

    case Quantity:
    {
      if (!isInteger(value)) throw new HttpError(foodItemMessages.SINTAX_ERROR, 400)
      break
    }

    case Price:
    {
      console.log('Handle price')
      if (!isInteger(value)) throw new HttpError(foodItemMessages.SINTAX_ERROR, 400)
      break
    }

    case Status:
    {
      if (!(isInteger(value) && (value >= 0 && value <= 1))) throw new HttpError(foodItemMessages.SINTAX_ERROR, 400)
      break
    }

    default:
      return true
  }

  return true
}

export default validateParseValues
