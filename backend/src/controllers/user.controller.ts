import { Request, Response } from 'express'
import * as userService from '../services/user.service'
import UserEntries from '../types/user.types'

export const getUserById = (req: Request, res: Response): Response => {
  const getUser = userService.getUserById(+req.params.id)
  return res.json(getUser)
}

export const createUser = (req: Request, res: Response): Response => {
  const { name, email, password, role } = req?.body

  const createUser = userService.createUser({
    name,
    email,
    password,
    role
  })

  return res.json(createUser)
}

export const getUsers = (_req: Request, res: Response): Response => {
  const getUsers: UserEntries[] = userService.getUsers()

  return res.json(getUsers)
}

export const getTrueUsers = async (_req: Request, res: Response): Promise<Response> => {
  const users: UserEntries[] = await userService.getTrueUsers()

  return res.json(users)
}
