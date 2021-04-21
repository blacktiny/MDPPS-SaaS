import { action } from 'typesafe-actions'
import { Currency, CurrencyActionTypes } from './types'

export const setCurrency = (data: Currency[]) =>
  action(CurrencyActionTypes.SET, data)
export const resetCurrency = () => action(CurrencyActionTypes.RESET)
