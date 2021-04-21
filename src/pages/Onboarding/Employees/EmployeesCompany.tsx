import React from 'react'
import { RouteComponentProps } from '@reach/router'
import QuestionsTemplate from '../../../components/templates/Onboarding/Questions'
import { STEPS } from './Steps'
import EmployeesCompanyForm from './EmployeesCompanyForm'

interface Props extends RouteComponentProps {}

const EmployeesCompany: React.FC<Props> = () => (
  <QuestionsTemplate steps={STEPS} activeStep={2}>
    <EmployeesCompanyForm />
  </QuestionsTemplate>
)

export default EmployeesCompany
