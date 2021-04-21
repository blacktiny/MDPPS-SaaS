/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { navigate, RouteComponentProps } from '@reach/router'
import { AxiosError } from 'axios'
import React, { Dispatch, Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RadioGroup } from 'rsuite'
import variables from '../../../../assets/styles/variables'
import PhoneNumberWithCodeInput from '../../../../components/organisms/UserProfile/PhoneNumberWithCodeInput'
import { RegexPatterns } from '../../../../constants/common'
import { LOGIN, SIGNUP } from '../../../../constants/pagesPath'
import { extractErrorPassResetMessage } from '../../../../utils/data'
import rfs, {
  boxModel,
  ButtonWrapper,
  FlexBetween
} from '../../../../utils/style'
import Button from '../../../../components/atoms/Button'
import Input from '../../../../components/atoms/Input'
import RadioButton from '../../../../components/atoms/RadioButton'
type FormData = {
  type: 'email' | 'sms'
  email: string
  number: string
}

interface Props extends RouteComponentProps {
  onSubmit: (data: FormData) => void
  error: AxiosError
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  showErrors: {
    email: boolean
  }
}
const { Colors } = variables

const AccountHint = styled.span`
  font-size: ${rfs('14px')};
  color: ${Colors.Gray[500]};
  transition: all 0.5s ease-in-out;
  letter-spacing: 0.28px;
  padding-right: ${boxModel('6px')};
`
const radioGroupCss = css`
  display: flex;
  gap: 65px;
  & label {
    font-size: 12px;
  }
`
const hide = css`
  position: relative;
  opacity: 0;
  z-index: -1;
`
const show = css`
  position: relative;
  opacity: 1;
  z-index: 1;
`
const FadeTransition = styled.div`
  transition: opacity 0.5s ease-in-out;
`
const InputContainer = styled.div`
  position: relative;
  margin-top: 13px;
  margin-bottom: 40px;
`
const AbsoluteDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
`
const radioCssPadding = css`
  .rs-radio-checker {
    padding-left: 26px;
  }
  .rs-radio-checker .rs-radio-wrapper {
    left: 0px;
  }
  .rs-radio-checker .rs-radio-wrapper {
  }
`
const preSubmit = (onSubmit: (data: FormData) => void) => (
  type: 'sms' | 'email'
) => (phoneNumber: string) => (email?: string) => (formData: FormData) => {
  onSubmit({
    type,
    email,
    number: phoneNumber.split(' ').join(''),
    ...formData
  })
}

export const PasswordResetForm: React.FC<Props> = ({
  onSubmit,
  error,
  showErrors,
  setShowErrors
}) => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const [type, setType] = useState<'email' | 'sms'>('email')
  const [phoneNumber, _setPhoneNumber] = useState<string>('')
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false)
  const [sendOTPDisabled, setSendOTPDisabled] = useState<boolean>(true)

  function setPhoneNumber(phone: string): void {
    return _setPhoneNumber(phone.split(/[()-]/).join(''))
  }
  return (
    <Fragment>
      <form onSubmit={handleSubmit(preSubmit(onSubmit)(type)(phoneNumber)())}>
        <div className="mb-20">
          <RadioGroup name="type" css={radioGroupCss}>
            <RadioButton
              css={radioCssPadding}
              label="via Email"
              value={'email'}
              onChange={() => {
                setType('email')
                setSendOTPDisabled(false)
              }}
            />
            <RadioButton
              label="via SMS"
              value={'sms'}
              onChange={() => {
                setType('sms')
                setSendOTPDisabled(false)
              }}
            />
          </RadioGroup>
          <InputContainer>
            <FadeTransition css={type === 'email' ? show : hide}>
              <Input
                name="email"
                id="email"
                placeholder="Enter your email address"
                invalid={errors?.email ? true : false}
                onChange={() => {
                  setShowErrors({
                    email: false
                  })
                }}
                errormsg={
                  (errors?.email?.type === 'required' &&
                    'Please enter your email address') ||
                  (errors?.email?.type === 'pattern' &&
                    'Please enter a valid email address')
                }
                ref={register({
                  required: type === 'email',
                  pattern: type === 'email' ? RegexPatterns.EMAIL : /./
                })}
              />
            </FadeTransition>
            <AbsoluteDiv>
              <FadeTransition css={type === 'sms' ? show : hide}>
                <PhoneNumberWithCodeInput
                  label=""
                  name="number"
                  phoneValue={phoneNumber}
                  phoneError={phoneNumberError}
                  placeholder="Enter your phone number"
                  showErrors={showErrors}
                  setShowErrors={setShowErrors}
                  setPhoneError={setPhoneNumberError}
                  setPhoneNumber={setPhoneNumber}
                />
              </FadeTransition>
            </AbsoluteDiv>
          </InputContainer>
          {showErrors.email && extractErrorPassResetMessage(error)}
        </div>
        <div css={ButtonWrapper}>
          <Button disabled={sendOTPDisabled} type="submit" className="w-100">
            Send OTP
          </Button>
        </div>
      </form>
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
    </Fragment>
  )
}
