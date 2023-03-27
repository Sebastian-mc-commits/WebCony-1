import { Model, ModelStatic } from 'sequelize'
import errorCodes from '../types/error.types'
import HttpError from './classes/httpError'

export const deleteAndRetrieve = async ({ id, model, inCaseOfError }: { id: number, model: ModelStatic<Model>, inCaseOfError: string }): Promise<ModelStatic<Model>> => {
  try {
    const modelDeleted: any = await model.findByPk(id)

    await model.destroy({
      where: {
        id: modelDeleted.id as number
      }
    })

    return modelDeleted
  } catch (error: any) {
    throw new HttpError(inCaseOfError, 405, error.message as string, errorCodes.DATABASE)
  }
}

export const updateAndRetrieve = async ({ id, model, data, inCaseOfError }: { id: number, model: ModelStatic<Model>, data: any, inCaseOfError: string }): Promise<ModelStatic<Model>> => {
  try {
    const modelUpDated: any = await model.findByPk(id)
    await model.update(data, {
      where: {
        id: modelUpDated.id as number
      }
    })

    return modelUpDated
  } catch (error: any) {
    throw new HttpError(inCaseOfError, 404, error.message as string, errorCodes.DATABASE)
  }
}

interface Fields {
  [key: string | number]: string | number
}

export const innerJoinAtBulkCreate = async ({ model, data, uniqueValue, joinModels, inCaseOfError }: { model: ModelStatic<Model>, data: Fields[], uniqueValue: string, joinModels: Array<typeof Model | any>, inCaseOfError: string }): Promise<any[]> => {
  try {
    const onHandlerCreateData = await model.bulkCreate(data as [])

    const modelData = model.findAll({
      where: {
        [uniqueValue]: onHandlerCreateData.map((element: any) => element[uniqueValue])
      },

      include: joinModels.map((modelRequired: any) => {
        return {
          model: modelRequired
        }
      })

    })

    return await modelData
  } catch (error: any) {
    throw new HttpError(inCaseOfError, 404, error.message as string, errorCodes.DATABASE)
  }
}
