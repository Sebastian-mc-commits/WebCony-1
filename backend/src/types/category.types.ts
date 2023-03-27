import GlobalInterface from './globalInterface.types'

export enum CategoryTypes {
  Id = 'id',
  Name = 'name'
}

interface CategoryEntries extends GlobalInterface { }

export type CategoryEntriesOpInput = Omit<Partial<CategoryEntries>, 'id'>
export type CategoryEntriesInput = Omit<CategoryEntries, 'id'>

export default CategoryEntries
