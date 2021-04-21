import { RevenueActionTypes as types, Revenue } from './types'
import { Reducer } from 'redux'

export const initialState: Revenue[] = []

const reducer: Reducer<Revenue[]> = (
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

export { reducer as revenueReducer }
