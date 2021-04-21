import { TokenActionTypes as types, Token } from './types'
import { Reducer } from 'redux'

export const initialState: Token = {
  access_token: null,
  expires_in: null,
  refresh_token: null,
  scope: null,
  token_type: null
}

const reducer: Reducer<Token> = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET:
      return { ...state, ...payload }
    case types.RESET:
      return initialState
    default:
      return state
  }
}

export { reducer as tokenReducer }
