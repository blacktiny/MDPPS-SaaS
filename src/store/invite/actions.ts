import { action } from 'typesafe-actions'
import { InviteActionTypes } from './types'
import { Invite } from 'shared/models/User'

export const addInvitation = (data: Invite) => action(InviteActionTypes.ADD_INVITATION, data)
