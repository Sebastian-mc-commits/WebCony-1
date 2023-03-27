import FoodItemEntries from '../types/foodItem.types'
import * as FootItemService from '../services/footItem.service'
import { Response, Request } from 'express'
import HttpError from '../utils/classes/httpError'
import routerMessages from '../utils/messages/router.messages.utils'

export const getFoodItems = async (_req: Request, res: Response): Promise<Response> => {
  const foodItems: FoodItemEntries[] = await FootItemService.getFootItems()

  return res.json(foodItems)
}

export const getFoodItem = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params?.id
  if (id === undefined || id === null) {
    throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  }

  const foodItems: FoodItemEntries = await FootItemService.getFootItem(+id)

  return res.json(foodItems)
}

export const createFoodItem = async (req: Request, res: Response): Promise<Response> => {
  const foodItemBody = req.body
  if (foodItemBody === undefined || foodItemBody === null) {
    throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  }

  const foodItems: FoodItemEntries = await FootItemService.createFoodItem(foodItemBody)

  return res.json(foodItems)
}

export const deleteFoodItem = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params?.id
  if (id === undefined || id === null) {
    throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  }

  const foodItems = await FootItemService.deleteFoodItem(+id)

  return res.json(foodItems)
}

export const updateFoodItem = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params?.id
  const foodItemBody = req.body
  if (id === undefined || id === null) {
    throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  }

  const foodItems = await FootItemService.updateFoodItem(+id, foodItemBody)

  return res.json(foodItems)
}
