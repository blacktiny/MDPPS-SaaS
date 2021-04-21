import { action } from 'typesafe-actions'
import { CountryActionTypes, Country } from './types'

export const setCountry = (data: Country[]) =>
  action(CountryActionTypes.SET, data)
export const resetCountry = () => action(CountryActionTypes.RESET)
