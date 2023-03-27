import CategoryModel from '../models/categories.models'
import CategoryEntries, { CategoryEntriesInput, CategoryEntriesOpInput, CategoryTypes } from '../types/category.types'
import errorCodes from '../types/error.types'
import HttpError from '../utils/classes/httpError'
import { deleteAndRetrieve, updateAndRetrieve } from '../utils/customQueries'
import handlerValidateFields from '../utils/handlerFunctions/handlerValidateFields.utils'
import tryCatchHandler from '../utils/handlerFunctions/tryCatch.utils'
import categoryMessages from '../utils/messages/category.messages.utils'

export const createCategory = async (model: CategoryEntriesInput): Promise<CategoryEntries> => {
  return tryCatchHandler({
    evaluateCode: errorCodes.DATABASE,

    fn: async (): Promise<CategoryEntries> => {
      handlerValidateFields({
        entry: model,
        enumIterator: CategoryTypes,
        areFieldsOptional: false,
        registerPk: CategoryTypes.Id
      })

      const categories = await CategoryModel.create(model, {
        returning: true
      })

      if (categories === null) throw new HttpError(categoryMessages.NOT_CREATED, 404, '', errorCodes.DATABASE)

      return categories
    }
  })
}

export const getCategories = async (): Promise<CategoryEntries[]> => {
  return tryCatchHandler({
    evaluateCode: errorCodes.DATABASE,

    fn: async (): Promise<CategoryEntries[]> => {
      const categories = await CategoryModel.findAll()

      if (categories.length === 0) throw new HttpError(categoryMessages.NOT_FOUNDED, 404, '', errorCodes.DATABASE)

      return categories
    }
  })
}

export const getCategory = async (id: number): Promise<CategoryEntries> => {
  return tryCatchHandler({
    evaluateCode: errorCodes.DATABASE,

    fn: async (): Promise<CategoryEntries> => {
      const category = await CategoryModel.findByPk(id)

      if (category === null) throw new HttpError(categoryMessages.NOT_FOUNDED, 404, '', errorCodes.DATABASE)

      return category
    }
  })
}

export const deleteCategory = async (id: number): Promise<CategoryEntries> => {
  return await deleteAndRetrieve({
    id,
    model: CategoryModel,
    inCaseOfError: categoryMessages.NOT_DELETED
  })
}

export const updateCategory = async (id: number, model: CategoryEntriesOpInput): Promise<CategoryEntries> => {
  handlerValidateFields({
    entry: model,
    enumIterator: CategoryTypes,
    areFieldsOptional: true,
    registerPk: CategoryTypes.Id
  })

  return await updateAndRetrieve({
    id,
    model: CategoryModel,
    data: model,
    inCaseOfError: categoryMessages.NOT_UPDATED
  })
}
