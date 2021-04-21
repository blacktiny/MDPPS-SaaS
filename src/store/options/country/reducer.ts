import { CountryActionTypes as types, Country } from './types'
import { Reducer } from 'redux'

export const initialState: Country[] = []

const reducer: Reducer<Country[]> = (
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

export { reducer as countryReducer }
