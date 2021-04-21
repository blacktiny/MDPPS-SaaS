import { Invite } from 'shared/models/User'

export interface InviteStateTypes {
  invitations: Invite[]
}

export enum InviteActionTypes {
  ADD_INVITATION = '@@location/ADD_INVITATION'
}
