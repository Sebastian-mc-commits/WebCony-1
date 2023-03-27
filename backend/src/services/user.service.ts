import UserEntries, { UserTypeInput } from './../types/user.types'
import UserModel from '../models/user.model'
import HttpError from '../utils/classes/httpError'
import userMessages from '../utils/messages/user.messages.utils'
import Users from './users'

// const users: UserEntries[] = Users as UserEntries[]

export const getUsers = (): UserEntries[] => Users

export const createUser = (newUserEntry: UserTypeInput): UserEntries => {
  // handlerValidateFields({
  //   entry: newUserEntry,
  //   enumIterator: UserValueTypes
  // })

  const newUser = {
    id: Math.max(...Users.map(u => u.id ?? 1)) + 1,
    ...newUserEntry
  }

  Users.push(newUser)
  return newUser
}

export const getUserById = (id: number): UserEntries | undefined => {
  const user: UserEntries | undefined = Users.find(u => u.id === id)

  if (user === null || user === undefined) throw new HttpError(userMessages.USER_NOT_FOUND, 404)

  return user
}

export const getTrueUsers = async (): Promise<UserEntries[]> => {
  try {
    const users: UserEntries[] = await UserModel.findAll()

    if (users.length === 0) throw new HttpError(userMessages.USERS_NOT_FOUND, 400)

    return users
  } catch (error: any) {
    throw new HttpError('Unexpected', 500, error.message as string)
  }
}
