import { action } from 'typesafe-actions'
import { UserActionTypes } from './types'

import { User, ActiveCompany } from '../../../shared/models/User'

export const setUserData = (data: User) => action(UserActionTypes.SET, data)
export const resetUserData = () => action(UserActionTypes.RESET)
export const setUserUpdate = (data: User) =>
  action(UserActionTypes.UPDATE, data)
export const switchAccountCompany = (data: ActiveCompany) =>
  action(UserActionTypes.SWITCH_ACCOUNT_COMPANY, data)
