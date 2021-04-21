import { action } from 'typesafe-actions'
import { Language, LanguageActionTypes } from './types'

export const setLanguage = (data: Language[]) =>
  action(LanguageActionTypes.SET, data)
export const resetLanguage = () => action(LanguageActionTypes.RESET)
