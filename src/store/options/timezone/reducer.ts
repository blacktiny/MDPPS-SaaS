import { TimezoneActionTypes as types, Timezone } from './types'
import { Reducer } from 'redux'

export const initialState: Timezone[] = []

const reducer: Reducer<Timezone[]> = (
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

export { reducer as timezoneReducer }
