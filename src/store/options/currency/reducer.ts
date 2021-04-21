import { CurrencyActionTypes as types, Currency } from './types'
import { Reducer } from 'redux'

export const initialState: Currency[] = []

const reducer: Reducer<Currency[]> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.SET:
      return payload
    case types.RESET:
      return initialState
    default:
      return state
  }
}

export { reducer as currencyReducer }
