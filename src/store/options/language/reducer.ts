import { LanguageActionTypes as types, Language } from './types'
import { Reducer } from 'redux'

export const initialState: Language[] = []

const reducer: Reducer<Language[]> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.SET:
      return payload
    case types.RESET:
      return initialState
    default:
      return state
  }
}

export { reducer as languageReducer }
