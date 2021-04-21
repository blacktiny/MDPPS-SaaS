import React from 'react'
import { RouteComponentProps, Redirect, useLocation } from '@reach/router'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'
import { Onboarding as OnboardingType } from 'store/onboarding/types'
import { User } from '../../shared/models/User'
import { SUSPENDED_BY_PLATFORM } from '../../constants/pagesPath'

const Onboarding: React.FC<RouteComponentProps> = ({ children }) => {
  let location = useLocation()

  const user = useSelector<RootState>(({ auth }) => auth.user) as User
  const onboarding = useSelector<RootState>(({ onboarding }) => onboarding) as OnboardingType

  if (user?.is_disabled) {
    return <Redirect to={SUSPENDED_BY_PLATFORM} noThrow />
  }

  if (user?.is_onboarding_complete) {
    if (!user?.active_company?.user_permission?.active) {
      return <Redirect to="/dashboard/home/user-profile" noThrow />
    }

    return <Redirect to="/dashboard/home" noThrow />
  } else {
    if (!location.pathname.includes(`${user?.initial_account_type}`)) {
      return (
        <Redirect
          to={`/dashboard/onboarding/${user?.initial_account_type}/${onboarding.prevStep || 'welcome'}`}
          noThrow
        />
      )
    }
  }

  return <div>{children}</div>
}

export default Onboarding
