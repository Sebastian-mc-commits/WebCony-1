/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import asyncHandler from '../utils/handlerFunctions/asyncHandler.utils'
import * as CategoryController from '../controllers/category.controller'

const router = Router()

router.post('/createCategory', asyncHandler(CategoryController.createCategory))

router.get('/getCategories', asyncHandler(CategoryController.getCategories))

router.get('/getCategory/:id', asyncHandler(CategoryController.getCategory))

router.put('/updateCategory/:id', asyncHandler(CategoryController.updateCategory))

router.delete('/deleteCategory/:id', asyncHandler(CategoryController.deleteCategory))

router.get('/throwError/', CategoryController.throwError)

export default router
