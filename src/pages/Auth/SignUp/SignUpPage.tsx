import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { SignUp } from './components/SignUp'
import SignUpTemplate from '../../../components/templates/SignUpTemplate'
export const SignUpPage: React.FC<RouteComponentProps<{ token: string }>> = props => (
  <SignUpTemplate pageHeader="Create Your MDPPS Account">
    <SignUp {...props} token={props.token} />
  </SignUpTemplate>
)

export default SignUpPage
