import { InviteActionTypes as types, InviteStateTypes } from './types'
import { Reducer } from 'redux'

export const initialState: InviteStateTypes = {
  invitations: []
}

const reducer: Reducer<InviteStateTypes> = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_INVITATION: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.invitations.push(payload)
      return newState
    }
    default:
      return state
  }
}

export default reducer
