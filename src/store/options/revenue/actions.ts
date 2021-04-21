import { action } from 'typesafe-actions'
import { RevenueActionTypes, Revenue } from './types'

export const setRevenue = (data: Revenue[]) =>
  action(RevenueActionTypes.SET, data)
export const resetRevenue = () => action(RevenueActionTypes.RESET)
