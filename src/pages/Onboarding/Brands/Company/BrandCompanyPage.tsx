import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from '@reach/router'
import QuestionsTemplate from '../../../../components/templates/Onboarding/Questions'
import { BrandCompany } from './components/BrandCompany'
import { RootState } from 'store/types'
import { User } from 'shared/models/User'
import { getOnboardingSteps } from 'utils/helpers'

interface Props extends RouteComponentProps {}

const BrandCompanyPage: React.FC<Props> = () => {
  const user = useSelector<RootState>(({ auth }) => auth?.user) as User

  const steps = useMemo(() => {
    return getOnboardingSteps(user)
  }, [user])

  return (
    <QuestionsTemplate steps={steps} activeStep={2}>
      <BrandCompany />
    </QuestionsTemplate>
  )
}

export default BrandCompanyPage
