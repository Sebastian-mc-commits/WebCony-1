import GlobalInterface from './globalInterface.types'

export enum OrderTypes {
  Id = 'id',
  Date = 'date',
  FoodItemId = 'foodItemId',
  SpotQr = 'spotQr',
}

interface OrderEntries extends Omit<GlobalInterface, 'name'> {
  date?: string
  foodItemId: number
  spotQr: number
}

export type OrderEntriesInput = Omit<OrderEntries, 'id'>

export type OrderEntriesOpInput = Omit<Partial<OrderEntries>, 'id'>

export default OrderEntries
