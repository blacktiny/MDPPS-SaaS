import { User } from '../../shared/models/User'
import { Token } from './token'

export interface AuthState {
  token: Token
  user: User
}
