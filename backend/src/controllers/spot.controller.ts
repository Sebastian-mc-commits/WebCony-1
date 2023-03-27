import * as SpotService from '../services/spot.service'
import { Response, Request } from 'express'
import SpotEntries from '../types/spot.types'
import routerMessages from '../utils/messages/router.messages.utils'
import HttpError from '../utils/classes/httpError'

export const getSpots = async (_req: Request, res: Response): Promise<Response> => {
  const spots: SpotEntries[] = await SpotService.getSpots()

  return res.json(spots)
}

export const getSpot = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params?.id
  if (id === undefined || id === null) {
    throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  }

  const spots: SpotEntries = await SpotService.getSpot(+id)

  return res.json(spots)
}

export const deleteSpot = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params?.id
  if (id === undefined || id === null) {
    throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  }

  const spot = await SpotService.deleteSpot(+id)

  return res.json(spot)
}

export const updateSpot = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params?.id
  const spotBody = req.body
  if (id === undefined || id === null) {
    throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  }

  const spot = await SpotService.updateSpot(+id, spotBody)

  return res.json(spot)
}

export const createSpot = async (req: Request, res: Response): Promise<Response> => {
  const spotBody = req.body

  const spot = await SpotService.createSpot(spotBody)

  return res.json(spot)
}
