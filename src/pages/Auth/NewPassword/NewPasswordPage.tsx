import React from 'react'
import { RouteComponentProps, globalHistory } from '@reach/router'
import AuthTemplate from '../../../components/templates/AuthTemplate'
import { NewPassword } from './components/NewPassword'

interface Props extends RouteComponentProps {
  otp?: string
}

const NewPasswordPage: React.FC<Props> = () => {
  const token = globalHistory?.location?.state?.otp

  return (
    <AuthTemplate
      pageHeader="New Password"
      subtitleClassName="text-left mt-10 mb-0"
      subTitle="Your password needs to have at least one symbol or number, and have at
      least 8 characters."
    >
      <NewPassword otp={token} />
    </AuthTemplate>
  )
}

export default NewPasswordPage
