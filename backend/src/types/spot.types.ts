export enum SpotTypes {
  Qr = 'qr',
  PlaceSet = 'placeSet',
  UserId = 'userId'
}

interface SpotEntries {
  qr?: number
  placeSet: string
  userId?: number
}

export type SpotEntriesinput = Omit<SpotEntries, 'id' | 'userId'>
export type SpotEntriesOpInput = Omit<Partial<SpotEntries>, 'id'>

export default SpotEntries
