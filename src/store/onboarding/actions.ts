import { action } from 'typesafe-actions'
import { OnboardingActionTypes, Onboarding } from './types'

export const updateOnboarding = (data: Onboarding) => action(OnboardingActionTypes.UPDATE_ONBOARDING, data)
export const getOnboarding = () => action(OnboardingActionTypes.GET_ONBOARDING)
export const clearOnboarding = () => action(OnboardingActionTypes.CLEAR_ONBOARDING)
