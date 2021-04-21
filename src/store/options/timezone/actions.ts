import { action } from 'typesafe-actions'
import { Timezone, TimezoneActionTypes } from './types'

export const setTimezone = (data: Timezone[]) =>
  action(TimezoneActionTypes.SET, data)
export const resetTimezone = () => action(TimezoneActionTypes.RESET)
