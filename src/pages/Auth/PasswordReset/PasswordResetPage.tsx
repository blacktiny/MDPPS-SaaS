/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { RouteComponentProps } from '@reach/router'
import React from 'react'
import AuthTemplate from '../../../components/templates/AuthTemplate'
import Button from '../../../components/atoms/Button'
import { PasswordReset } from './components/PasswordReset'

interface Props extends RouteComponentProps {}
const textLeft = css`
  text-align: left;
`
const authCss = css`
  .mb-40 {
    margin-bottom: 20px;
  }
`

const PasswordResetPage: React.FC<Props> = () => (
  <div css={authCss}>
    <AuthTemplate
      pageHeader="Password Reset"
      subtitleClassName="text-left mb-0 mt-10"
      subTitle={
        <span css={textLeft}>
          We’ll send you a One Time Password (OTP) to reset your current
          password. Choose how you would like to receive the OTP:
        </span>
      }
      bottomText={[
        `If you no longer use the email address associated with your MDPPS account, you may contact `,
        <Button
          link
          className="customer-service-link mr-1"
          key="customer-service-link"
        >
          Customer Service
        </Button>,
        `for help restoring access to your account.`
      ]}
    >
      <PasswordReset />
    </AuthTemplate>
  </div>
)

export default PasswordResetPage
