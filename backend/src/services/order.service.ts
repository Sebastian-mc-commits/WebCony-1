import FoodItemModel from '../models/foodItem.model'
import OrderModel from '../models/order.model'
import SpotModel from '../models/spot.model'
import errorCodes from '../types/error.types'
import OrderEntries, { OrderEntriesInput, OrderTypes } from '../types/order.types'
import HttpError from '../utils/classes/httpError'
import { innerJoinAtBulkCreate } from '../utils/customQueries'
import tryCatchHandler from '../utils/handlerFunctions/tryCatch.utils'
import orderMessages from '../utils/messages/order.messages.utils'

export const getOrders = async (): Promise<OrderEntries[]> => {
  return tryCatchHandler({
    evaluateCode: errorCodes.DATABASE,

    fn: async (): Promise<OrderEntries[]> => {
      const orders = await OrderModel.findAll()

      if (orders.length === 0) {
        throw new HttpError(orderMessages.NOT_ORDER_STORE, 404, '', errorCodes.DATABASE)
      }
      return orders
    }
  })
}

export const createOrder = async (arrayOrder: OrderEntriesInput[]): Promise<OrderEntries[]> => {
  return tryCatchHandler({
    evaluateCode: errorCodes.DATABASE,

    fn: async (): Promise<OrderEntries[]> => {
      const orders = await innerJoinAtBulkCreate({
        data: arrayOrder,
        inCaseOfError: orderMessages.NOT_CREATED,
        joinModels: [SpotModel, FoodItemModel],
        model: OrderModel,
        uniqueValue: OrderTypes.Date
      })

      if (orders === undefined || orders === null) {
        throw new HttpError(orderMessages.NOT_ORDER_STORE, 404, '', errorCodes.DATABASE)
      }
      return orders
    }
  })
}

export const getOrderByDate = async (date: string): Promise<OrderEntries[]> => {
  return tryCatchHandler({
    evaluateCode: errorCodes.DATABASE,

    fn: async (): Promise<OrderEntries[]> => {
      const orders: OrderEntries[] = await OrderModel.findAll({
        where: {
          date
        },

        include: [
          {
            model: FoodItemModel
          },
          {
            model: SpotModel
          }
        ]
      })
      if (orders.length === 0) {
        throw new HttpError(orderMessages.NOT_ORDER_STORE, 404, '', errorCodes.DATABASE)
      }

      return orders
    }
  })
}

export const getOrderById = async (id: number): Promise<OrderEntries> => {
  return tryCatchHandler({
    evaluateCode: errorCodes.DATABASE,

    fn: async (): Promise<OrderEntries> => {
      const order = await OrderModel.findOne({
        where: {
          id
        },

        include: [
          {
            model: FoodItemModel
          },
          {
            model: SpotModel
          }
        ]
      })
      if (order === undefined || order === null) {
        throw new HttpError(orderMessages.NOT_ORDER_STORE, 404, '', errorCodes.DATABASE)
      }
      return order
    }
  })
}
