import { ModelStatic } from 'sequelize'
import CategoryModel from '../models/categories.models'
import FoodItemModel from '../models/foodItem.model'
import errorCodes from '../types/error.types'
import FoodItemEntries, { FoodItemEntriesInput, FoodItemEntriesOpInput, FoodItemTypes } from '../types/foodItem.types'
import HttpError from '../utils/classes/httpError'
import { deleteAndRetrieve, updateAndRetrieve } from '../utils/customQueries'
import handlerValidateFields from '../utils/handlerFunctions/handlerValidateFields.utils'
import tryCatchHandler from '../utils/handlerFunctions/tryCatch.utils'
import foodItemMessages from '../utils/messages/foodItems.messages.utils'

export const getFootItems = async (): Promise<FoodItemEntries[]> => {
  return tryCatchHandler({
    evaluateCode: errorCodes.DATABASE,

    fn: async (): Promise<FoodItemEntries[]> => {
      const foodItems: FoodItemEntries[] = await FoodItemModel.findAll({
        include: [
          {
            model: CategoryModel,
            required: true
          }
        ]
      })

      if (foodItems.length === 0) {
        throw new HttpError(foodItemMessages.NOT_FOOD_STORE, 404, '', errorCodes.DATABASE)
      }
      return foodItems
    }
  })
}

export const getFootItem = async (id: number): Promise<FoodItemEntries> => {
  return tryCatchHandler({
    evaluateCode: errorCodes.DATABASE,

    fn: async (): Promise<FoodItemEntries> => {
      const foodItem: FoodItemEntries | undefined | null = await FoodItemModel.findOne({
        where: {
          id
        },

        include: [
          {
            model: CategoryModel,
            required: true
          }
        ]
      })

      if (foodItem === undefined || foodItem === null) {
        throw new HttpError(foodItemMessages.NOT_FOOD_STORE, 404, '', errorCodes.DATABASE)
      }
      return foodItem
    }
  })
}

export const deleteFoodItem = async (id: number): Promise<ModelStatic<any>> => {
  return await deleteAndRetrieve({
    id,
    model: FoodItemModel,
    inCaseOfError: foodItemMessages.NOT_DELETED
  })
}

export const updateFoodItem = async (id: number, model: FoodItemEntriesOpInput): Promise<ModelStatic<any>> => {
  handlerValidateFields({
    entry: model,
    enumIterator: FoodItemTypes,
    areFieldsOptional: true,
    registerPk: FoodItemTypes.Id
  })

  return await updateAndRetrieve({
    id,
    data: model,
    model: FoodItemModel,
    inCaseOfError: foodItemMessages.NOT_UPDATED
  })
}

export const createFoodItem = async (model: FoodItemEntriesInput): Promise<FoodItemEntries> => {
  return tryCatchHandler({
    evaluateCode: errorCodes.DATABASE,

    fn: async (): Promise<FoodItemEntries> => {
      handlerValidateFields({
        entry: model,
        enumIterator: FoodItemTypes,
        areFieldsOptional: false,
        registerPk: FoodItemTypes.Id
      })

      const foodItem: FoodItemEntries | undefined | null = await FoodItemModel.create(model, {
        returning: true
      })

      if (foodItem === undefined || foodItem === null) {
        throw new HttpError(foodItemMessages.NOT_CREATED, 409, '', errorCodes.DATABASE)
      }
      return foodItem
    }
  })
}
