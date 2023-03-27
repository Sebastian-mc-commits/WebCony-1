import { updateAndRetrieve } from './../utils/customQueries'
import { ModelStatic } from 'sequelize'
import SpotModel from '../models/spot.model'
import UserModel from '../models/user.model'
import errorCodes from '../types/error.types'
import SpotEntries, { SpotEntriesinput, SpotEntriesOpInput, SpotTypes } from '../types/spot.types'
import HttpError from '../utils/classes/httpError'
import { deleteAndRetrieve } from '../utils/customQueries'
import handlerValidateFields from '../utils/handlerFunctions/handlerValidateFields.utils'
import tryCatchHandler from '../utils/handlerFunctions/tryCatch.utils'
import spotMessages from '../utils/messages/spot.messages.utils'

export const getSpots = async (): Promise<SpotEntries[]> => {
  return tryCatchHandler({
    evaluateCode: errorCodes.DATABASE,

    fn: async (): Promise<SpotEntries[]> => {
      const spots: SpotEntries[] = await SpotModel.findAll()

      if (spots.length === 0) {
        throw new HttpError(spotMessages.NOT_SPOT_STORE, 404, '', errorCodes.DATABASE)
      }

      return spots
    }
  })
}

export const getSpot = async (id: number): Promise<SpotEntries> => {
  return tryCatchHandler({
    evaluateCode: errorCodes.DATABASE,

    fn: async (): Promise<SpotEntries> => {
      const spot: SpotEntries | null | undefined = await SpotModel.findOne({
        where: {
          qr: id
        },

        include: [
          {
            model: UserModel
          }
        ]
      })

      if (spot === undefined || spot === null) {
        throw new HttpError(spotMessages.NOT_SPOT_STORE, 404, '', errorCodes.DATABASE)
      }

      return spot
    }
  })
}

export const createSpot = async (model: SpotEntriesinput): Promise<SpotEntries> => {
  return tryCatchHandler({
    evaluateCode: errorCodes.DATABASE,

    fn: async (): Promise<SpotEntries> => {
      handlerValidateFields({
        entry: model,
        enumIterator: SpotTypes,
        areFieldsOptional: false,
        registerPk: SpotTypes.Qr
      })

      const spotCreated: SpotEntries | null | undefined = await SpotModel.create(model, {
        returning: true
      })

      if (spotCreated === undefined || spotCreated === null) {
        throw new HttpError(spotMessages.NOT_CREATED, 409, '', errorCodes.DATABASE)
      }

      return spotCreated
    }
  })
}

export const deleteSpot = async (id: number): Promise<ModelStatic<any>> => {
  return await deleteAndRetrieve({
    id,
    model: SpotModel,
    inCaseOfError: spotMessages.NOT_DELETED
  })
}

export const updateSpot = async (id: number, model: SpotEntriesOpInput): Promise<ModelStatic<any>> => {
  handlerValidateFields({
    entry: model,
    enumIterator: SpotTypes,
    areFieldsOptional: true,
    registerPk: SpotTypes.Qr
  })

  return await updateAndRetrieve({
    id,
    model: SpotModel,
    inCaseOfError: spotMessages.NOT_UPDATED,
    data: model
  })
}
