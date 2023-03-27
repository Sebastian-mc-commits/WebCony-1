import { Request, Response } from 'express'
import * as OrderService from '../services/order.service'
import HttpError from '../utils/classes/httpError'
import routerMessages from '../utils/messages/router.messages.utils'

export const getOrders = async (_req: Request, res: Response): Promise<Response> => {
  const orders = await OrderService.getOrders()

  return res.json(orders)
}

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  const order = req.body

  if (order === undefined) {
    throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  }
  const orders = await OrderService.createOrder(order)

  return res.json(orders)
}

export const getOrderByDate = async (req: Request, res: Response): Promise<Response> => {
  const { date = undefined } = req?.params
  if (date === undefined) {
    throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  }
  const orders = await OrderService.getOrderByDate(date)

  return res.json(orders)
}

export const getOrderById = async (req: Request, res: Response): Promise<Response> => {
  const { id = undefined } = req?.params
  if (id === undefined) {
    throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  }
  const order = await OrderService.getOrderByDate(id)

  return res.json(order)
}
