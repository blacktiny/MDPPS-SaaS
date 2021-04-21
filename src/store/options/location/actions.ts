import { action } from 'typesafe-actions'
import { LocationActionTypes, Location } from './types'

export const setLocation = (data: Location[]) =>
  action(LocationActionTypes.SET, data)
export const resetLocation = () => action(LocationActionTypes.RESET)
