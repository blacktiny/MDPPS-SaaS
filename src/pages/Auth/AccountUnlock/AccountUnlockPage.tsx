/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import AuthTemplate from '../../../components/templates/AuthTemplate'
import Button from '../../../components/atoms/Button'
import rfs, { boxModel, FlexBetween } from '../../../utils/style'
import variables from '../../../assets/styles/variables'
import styled from '@emotion/styled'
import { AccountUnlock } from './components/AccountUnlock'
import { LOGIN, SIGNUP } from '../../../constants/pagesPath'

interface Props extends RouteComponentProps {}

const { Colors } = variables

const AccountHint = styled.span`
  font-size: ${rfs('14px')};
  color: ${Colors.Gray[500]};
  transition: all 0.5s ease-in-out;
  letter-spacing: 0.28px;
  padding-right: ${boxModel('6px')};
`
const AccountUnlockPage: React.FC<Props> = () => (
  <AuthTemplate
    pageHeader="Unlock Your Account"
    subTitle={
      <span>
        Your account has been locked. Enter your email address to receive
        instructions for unlocking it.
      </span>
    }
    bottomText={[
      `If you no longer use the email address associated with your MDPPS account, you may contact `,
      <Button
        link
        className="customer-service-link mr-1"
        key="customer-service-link"
        onClick={() => {}}
      >
        Customer Service
      </Button>,
      `Customer Service for help restoring access to your account.`
    ]}
  >
    <AccountUnlock />
    <div css={FlexBetween} className="mt-10">
      <Button link start onClick={() => navigate(LOGIN)}>
        Back to sign in
      </Button>

      <div className="d-flex">
        <AccountHint>{`Don't have an account?`}</AccountHint>
        <Button link onClick={() => navigate(SIGNUP)}>
          Sign up
        </Button>
      </div>
    </div>
  </AuthTemplate>
)

export default AccountUnlockPage
