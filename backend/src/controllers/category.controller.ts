import { CategoryEntriesInput, CategoryEntriesOpInput } from './../types/category.types'
import { Request, Response } from 'express'
import * as CategoryService from '../services/category.service'
import HttpError from '../utils/classes/httpError'
import routerMessages from '../utils/messages/router.messages.utils'

export const getCategories = async (_req: Request, res: Response): Promise<Response> => {
  const category = await CategoryService.getCategories()
  return res.json(category)
}

export const getCategory = async (req: Request, res: Response): Promise<Response> => {
  const { id = null } = req.params

  if (id === null) throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  const category = await CategoryService.getCategory(+id)
  return res.json(category)
}

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params?.id

  if (id === null || id === undefined) throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  const category = await CategoryService.deleteCategory(+id)
  return res.json(category)
}

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
  const { id = null } = req.params
  const data: CategoryEntriesOpInput = req.body

  if (id === null) throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  const category = await CategoryService.updateCategory(+id, data)
  return res.json(category)
}

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  const data: CategoryEntriesInput = req.body

  if (data === null) throw new HttpError(routerMessages.ROUTER_FIELD_NEEDED, 400)
  const category = await CategoryService.createCategory(data)
  return res.json(category)
}

export const throwError = async (_req: Request, _res: Response): Promise<Response> => {
  const z: number = 0

  if (z === 0) {
    throw new HttpError(routerMessages.ROUTER_NOT_FOUND as string, 100, 'as string')
  }

  return _res.json({ f: 'fellas' })
}
