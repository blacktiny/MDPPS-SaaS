import { navigate, RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { LOGIN } from '../../../constants/pagesPath'
import AuthTemplate from '../../../components/templates/AuthTemplate'
import { ConfirmOTP } from './components/ConfirmOTP'

interface Props extends RouteComponentProps {}

const MediumText = styled.span`
  font-weight: 500;
`

const ConfirmOTPPage: React.FC<Props> = ({ location }) => {
  const email = (location?.state as { email: string })?.email
  const fromPage = (location?.state as { fromPage: string })?.fromPage
  const phoneNumber = (location?.state as { phoneNumber: string })?.phoneNumber

  const otpType = email ? 'email' : phoneNumber ? 'phone-number' : ''

  useEffect(() => {
    if (!email && !phoneNumber) {
      navigate(LOGIN)
    }
  }, [email, phoneNumber])

  return (
    <AuthTemplate
      pageHeader="Authentication Required"
      subtitleClassName="text-left mb-0 mt-10"
      subTitle={
        <>
          For your security we need to authenticate your request {otpType === 'email' ? 'and have' : `. We've`} sent a
          One Time Password (OTP) to <MediumText>{otpType === 'email' ? email : phoneNumber}</MediumText>. Please enter
          it below.
        </>
      }
    >
      {email && <ConfirmOTP email={email} fromPage={fromPage} />}
    </AuthTemplate>
  )
}

export default ConfirmOTPPage
