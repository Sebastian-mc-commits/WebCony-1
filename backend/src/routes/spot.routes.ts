import { Router } from 'express'
import * as SpotController from '../controllers/spot.controller'
import asyncHandler from '../utils/handlerFunctions/asyncHandler.utils'

const router = Router()

router.get('/getSpots', asyncHandler(SpotController.getSpots))

router.get('/getSpot/:id', asyncHandler(SpotController.getSpot))

router.post('/createSpot', asyncHandler(SpotController.createSpot))

router.put('/updateSpot/:id', asyncHandler(SpotController.updateSpot))

router.delete('/deleteSpot/:id', asyncHandler(SpotController.deleteSpot))

export default router
