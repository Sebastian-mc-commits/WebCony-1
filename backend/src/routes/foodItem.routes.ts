import { Router } from 'express'
import * as FoodItemController from '../controllers/foodItem.controller'
import asyncHandler from '../utils/handlerFunctions/asyncHandler.utils'

const router = Router()

router.get('/getFoodItems', asyncHandler(FoodItemController.getFoodItems))

router.get('/getFoodItem/:id', asyncHandler(FoodItemController.getFoodItem))

router.post('/createFoodItem', asyncHandler(FoodItemController.createFoodItem))

router.delete('/deleteFoodItem/:id', asyncHandler(FoodItemController.deleteFoodItem))

router.put('/updateFoodItem/:id', asyncHandler(FoodItemController.updateFoodItem))

export default router
