export interface Onboarding {
  prevStep?: string
  stepNumber?: number
  userType?: string
  currentMaxStep?: number
}

export enum OnboardingActionTypes {
  UPDATE_ONBOARDING = '@@location/UPDATE_ONBOARDING',
  GET_ONBOARDING = '@@location/GET_ONBOARDING',
  CLEAR_ONBOARDING = '@@location/CLEAR_ONBOARDING'
}
