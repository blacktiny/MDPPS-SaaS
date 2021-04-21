import { LocationActionTypes as types, Location } from './types'
import { Reducer } from 'redux'

export const initialState: Location[] = []

const reducer: Reducer<Location[]> = (
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

export { reducer as locationReducer }
