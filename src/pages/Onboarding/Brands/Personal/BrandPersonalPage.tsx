import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from '@reach/router'
import QuestionsTemplate from '../../../../components/templates/Onboarding/Questions'
import { BrandPersonal } from './components/BrandPersonal'
import { RootState } from 'store/types'
import { User } from 'shared/models/User'
import { getOnboardingSteps } from 'utils/helpers'

interface Props extends RouteComponentProps {}

const BrandPersonalPage: React.FC<Props> = () => {
  const user = useSelector<RootState>(({ auth }) => auth?.user) as User

  const steps = useMemo(() => {
    return getOnboardingSteps(user)
  }, [user])

  return (
    <QuestionsTemplate steps={steps} activeStep={1}>
      <BrandPersonal />
    </QuestionsTemplate>
  )
}

export default BrandPersonalPage
