import { OnboardingActionTypes as types, Onboarding } from './types'
import { Reducer } from 'redux'

export const initialState: Onboarding = {
  prevStep: '',
  stepNumber: 0,
  userType: '',
  currentMaxStep: 0
}

const reducer: Reducer<Onboarding> = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.UPDATE_ONBOARDING:
      return {
        ...state,
        ...payload
      }
    case types.GET_ONBOARDING:
      return state
    case types.CLEAR_ONBOARDING:
      return initialState
    default:
      return state
  }
}

export default reducer
