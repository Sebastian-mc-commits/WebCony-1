import HttpError from '../classes/httpError'
import generalMessages from '../messages/general.messages.utils'
import validateParseValues from '../validateParseValues.utils'

interface Fields {
  [key: string | number]: string | number
}

// const handlerValidateFields = <T extends Fields>({ entry, enumIterator }: { entry: T, enumIterator: Fields }): void => {
const handlerValidateFields = ({ entry, enumIterator, areFieldsOptional = false, registerPk = 'id' }: { entry: Fields, enumIterator: any, areFieldsOptional: boolean, registerPk: string }): void => {
  if (areFieldsOptional) {
    if (!Object.keys(entry).every(key => {
      return Object.values(enumIterator).some(enumValue => enumValue === key) && validateParseValues(entry[key], key)
    })) {
      throw new HttpError(generalMessages.FIELD_ERROR, 400)
    }
  } else {
    if (Object.keys(entry).includes(registerPk)) throw new HttpError(generalMessages.FIELD_ERROR, 400)
    for (const value of Object.values(enumIterator)) {
      const newValue: string = value as string

      if (registerPk === newValue) continue

      const currentEntry: string = entry[newValue] as string

      if (!(newValue in entry) || !validateParseValues(currentEntry, newValue)) {
        throw new HttpError(generalMessages.FIELD_ERROR, 400)
      }
    }
  }
}

export default handlerValidateFields
