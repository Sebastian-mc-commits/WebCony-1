import GlobalInterface from './globalInterface.types'

export enum UserValueTypes {
  Id = 'id',
  Name = 'name',
  Email = 'email',
  Password = 'password',
  Role = 'role'

}

interface UserEntries extends GlobalInterface {
  email: string
  password: string
  role: number
}

export type NewUserEntry = Omit<UserEntries, 'id'>

export type UserTypeInput = Omit<UserEntries, 'id'>

export interface UserTypeOuput extends Required<UserEntries> {}

export default UserEntries

/* message for deleting an user and an admin */
