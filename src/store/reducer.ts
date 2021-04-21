import { combineReducers } from 'redux'
import auth from './auth/reducer'
import onboarding from './onboarding/reducer'
import options from './options/reducer'

const rootReducer = combineReducers({
  auth,
  onboarding,
  options
})

export default rootReducer
