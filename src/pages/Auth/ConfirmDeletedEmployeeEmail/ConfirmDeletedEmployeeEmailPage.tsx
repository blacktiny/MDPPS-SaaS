/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { navigate, RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import { RadioGroup } from 'rsuite'
import { useForm } from 'react-hook-form'

import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import RadioButton from 'components/atoms/RadioButton'
import { boxModel } from '../../../utils/style'
import AuthTemplate from '../../../components/templates/AuthTemplate'
import CloseRed from '../../../assets/icons/close-red.svg'
import variables from '../../../assets/styles/variables'
import { LOGIN, OTP } from '../../../constants/pagesPath'
import { RootState } from '../../../store/types'
import { User } from '../../../shared/models/User'
import { RegexPatterns } from 'constants/common'
import axios from 'utils/http/client'
import { extractErrorMsgFromArray } from 'utils/data'

const { Fonts, Colors } = variables

interface Props extends RouteComponentProps {}
const textCenter = css`
  text-align: center;
`
const authCss = css`
  .mb-40 {
    margin-bottom: 30px;
    margin-top: 10px;
  }
`

const EmailView = styled.p`
  background-color: #f0f0f0;
  color: ${Colors.Black[0]};
  padding-bottom: ${boxModel('17px')};
  padding-top: ${boxModel('17px')};
  margin-left: ${boxModel('100px')};
  margin-right: ${boxModel('100px')};
  margin-bottom: ${boxModel('30px')};
  font-weight: ${Fonts.Weight.Medium};
  font-size: 14px;
  text-align: center;
  img {
    margin-left: ${boxModel('10px')};
  }
`

const RadioGroupStyled = styled(RadioGroup)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-top: 5px;

  .rs-radio-checker {
    font-size: 14px;
    text-align: left;
  }

  & > div {
    width: 50%;
  }
`

interface FormData {
  newEmail: string
}

const ConfirmDeletedEmployeeEmailPage: React.FC<Props> = () => {
  const { email } = useSelector<RootState>(({ auth }) => auth?.user) as User

  const { register, handleSubmit, errors } = useForm<FormData>()

  const [otpTarget, setOtpTarget] = useState('still')
  const [error, setError] = useState(null)

  const onSubmit = useCallback(
    (data: FormData) => {
      if (otpTarget === 'still') {
        axios({
          url: 'users/resend/',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify({ email: email })
        })
          .then(({ data }) => {
            navigate(OTP, {
              state: { fromPage: 'current-email', email: data?.email }
            })
          })
          .catch(err => {
            setError(err)
          })
      } else {
        axios({
          url: 'users/newemail/',
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify({ new_email: data.newEmail })
        })
          .then(() => {
            navigate(OTP, {
              state: { fromPage: 'new-email', email: data?.newEmail }
            })
          })
          .catch(err => {
            setError(err)
          })
      }
    },
    [email, otpTarget]
  )

  return (
    <form css={authCss} onSubmit={handleSubmit(onSubmit)}>
      <AuthTemplate
        pageHeader="Email Address Confirmation"
        subtitleClassName="text-center mb-0 mt-30"
        subTitle={
          <span css={textCenter}>
            We noticed that one of your companies has removed you from its team members. To continue you must re-confirm
            your current email address or update to a new one.
          </span>
        }
      >
        <EmailView>
          {email}
          <img src={CloseRed} alt="" />
        </EmailView>
        <div className="text-center mt-10 mb-10">
          <RadioGroupStyled value={otpTarget}>
            <RadioButton
              label="I still have access to it"
              value={'still'}
              onChange={() => setOtpTarget('still')}
              checked
            />
            <RadioButton label="I want to use a new one" value={'new'} onChange={() => setOtpTarget('new')} checked />
          </RadioGroupStyled>
        </div>
        {otpTarget === 'new' && (
          <div className="mb-10">
            <Input
              name="newEmail"
              id="newEmail"
              placeholder="Enter your new email address"
              label="New Email"
              onChange={() => {}}
              ref={register({
                required: true,
                pattern: RegexPatterns.EMAIL
              })}
              invalid={errors?.newEmail ? true : false}
              errormsg={
                (errors?.newEmail?.type === 'required' && 'Please enter your email address') ||
                (errors?.newEmail?.type === 'pattern' && 'Please enter a valid email address')
              }
            />
          </div>
        )}
        <div className="text-center mt-10 mb-10">
          <Button start type="submit" className="w-100">
            Send OTP
          </Button>
        </div>
        <div className="text-center mt-10 mb-10">
          <Button link start onClick={() => navigate(LOGIN)}>
            Back to sign in
          </Button>
        </div>
        {extractErrorMsgFromArray(error, otpTarget === 'still' ? 'email' : 'new_email')}
      </AuthTemplate>
    </form>
  )
}

export default ConfirmDeletedEmployeeEmailPage
