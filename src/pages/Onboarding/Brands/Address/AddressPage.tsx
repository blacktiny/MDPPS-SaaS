import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from '@reach/router'
import QuestionsTemplate from '../../../../components/templates/Onboarding/Questions'
import AddressQuestions from './AddressQuestions'
import { RootState } from 'store/types'
import { User } from 'shared/models/User'
import { getActiveStep, getOnboardingSteps } from 'utils/helpers'

interface Props extends RouteComponentProps {}

const AddressPage: React.FC<Props> = () => {
  const user = useSelector<RootState>(({ auth }) => auth?.user) as User

  const steps = useMemo(() => {
    return getOnboardingSteps(user)
  }, [user])

  const activeStep = useMemo(() => {
    return getActiveStep(user, 'address')
  }, [user])

  return (
    <QuestionsTemplate steps={steps} activeStep={activeStep}>
      <AddressQuestions />
    </QuestionsTemplate>
  )
}

export default AddressPage
