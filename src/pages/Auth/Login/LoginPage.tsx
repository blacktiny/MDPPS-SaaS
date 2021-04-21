import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Login } from './components/Login'
import AuthTemplate from '../../../components/templates/AuthTemplate'

const LoginPage: React.FC<RouteComponentProps> = props => {
  return (
    <AuthTemplate pageHeader="Sign Into Your Account">
      <Login {...props} />
    </AuthTemplate>
  )
}

export default LoginPage
