import { combineReducers } from 'redux'
import { AuthState } from './types'
import { userReducer } from './user'
import { tokenReducer } from './token'

const reducer = combineReducers<AuthState>({
  token: tokenReducer,
  user: userReducer
})

export default reducer
