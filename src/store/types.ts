import { AuthState } from './auth'
import { Onboarding } from './onboarding'
import { OptionsState } from './options'

export interface RootState {
  auth: AuthState
  onboarding: Onboarding
  options: OptionsState
}
