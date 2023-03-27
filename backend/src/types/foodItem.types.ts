import GlobalInterface from './globalInterface.types'

export enum FoodItemTypes {
  Id = 'id',
  Name = 'name',
  Quantity = 'quantity',
  CategoryType = 'categoryType',
  Status = 'status',
  Description = 'description',
  Price = 'price',
  ThumbnailUrl = 'thumbnailUrl'
}

interface FoodItemEntries extends GlobalInterface {
  quantity: number
  categoryType: number
  status: number
  description: string
  price: number
  thumbnailUrl: string
}

export type FoodItemEntriesInput = Omit<FoodItemEntries, 'id'>
export type FoodItemEntriesOpInput = Omit<Partial<FoodItemEntries>, 'id'>

export default FoodItemEntries
