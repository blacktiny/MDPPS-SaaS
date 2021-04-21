import { UserActionTypes as types } from './types'
import { User } from '../../../shared/models/User'
import { Reducer } from 'redux'

export const initialState: User = {
  is_onboarding_complete: false
}

const reducer: Reducer<User> = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET:
      return { ...state, ...payload }
    case types.RESET:
      return initialState
    case types.SWITCH_ACCOUNT_COMPANY:
      return { ...state, active_company: payload }
    case types.UPDATE:
      return { ...state, ...payload }
    default:
      return state
  }
}

export { reducer as userReducer }
