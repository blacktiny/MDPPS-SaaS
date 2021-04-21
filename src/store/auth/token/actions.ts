import { action } from 'typesafe-actions'
import { TokenActionTypes, Token } from './types'

export const setToken = (data: Token) => {
  data.time = new Date().getTime()
  return action(TokenActionTypes.SET, data)
}
export const resetToken = () => action(TokenActionTypes.RESET)
