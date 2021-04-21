import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { InviteEmployees } from './components/InviteEmployees'
import QuestionsTemplate from '../../../../components/templates/Onboarding/Questions'
import { STEPS } from '../Steps'

const InviteEmployeesPage: React.FC<RouteComponentProps> = () => {
  return (
    <QuestionsTemplate steps={STEPS} activeStep={4}>
      <InviteEmployees />
    </QuestionsTemplate>
  )
}

export default InviteEmployeesPage
