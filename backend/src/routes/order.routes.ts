import { Router } from 'express'
import * as OrderController from '../controllers/order.controller'
import asyncHandler from '../utils/handlerFunctions/asyncHandler.utils'

const router = Router()

router.get('/getOrders', asyncHandler(OrderController.getOrders))

router.post('/createOrder', asyncHandler(OrderController.createOrder))

router.get('/getOrderByDate/:date', asyncHandler(OrderController.getOrderByDate))

router.get('/getOrderById/:id', asyncHandler(OrderController.getOrderById))

export default router
