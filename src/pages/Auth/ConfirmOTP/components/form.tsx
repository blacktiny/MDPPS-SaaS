/** @jsx jsx */
import { jsx } from '@emotion/core'
import { RouteComponentProps } from '@reach/router'
import { AxiosError } from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  extractErrorMessage,
  extractErrorPassResetMessage,
  extractErrorResetEmail,
  extractErrorStatus
} from '../../../../utils/data'
import { ButtonWrapper } from '../../../../utils/style'
import Button from '../../../../components/atoms/Button'
import Counter from '../../../../components/atoms/Counter'
import Input from '../../../../components/atoms/Input'

type FormData = {
  otpCode: string
}

interface myProps {
  onSubmit: (data: FormData) => void
  errorConfirm?: AxiosError
  errorReset?: AxiosError
  errorResend?: AxiosError
  errorResendReset?: AxiosError
  errorResetEmail?: AxiosError
  errorResendResetEmail?: AxiosError
  dataResend?: string
  dataResendReset?: string
  dataResendResetEmail?: string
  isError: boolean
  errorType: string
  canCount?: boolean
  timer?: number
  onCountOver?: (arg: boolean) => void
  setShowErrors: React.Dispatch<
    React.SetStateAction<{
      otp: boolean
    }>
  >
  showErrors: {
    otp: boolean
  }
  isEmail: boolean
}

type Props = myProps & RouteComponentProps

export const ConfirmOTPForm: React.FC<Props> = ({
  onSubmit,
  errorConfirm,
  errorReset,
  errorResend,
  errorResendReset,
  errorResetEmail,
  errorResendResetEmail,
  dataResend,
  dataResendReset,
  dataResendResetEmail,
  isError,
  errorType,
  showErrors,
  setShowErrors,
  isEmail,
  timer = 30,
  canCount,
  onCountOver
}) => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-20">
        <Input
          name="otpCode"
          id="otpCode"
          placeholder="OTP"
          label="Enter OTP"
          text={
            <span className={canCount ? '' : 'hidden'}>
              Wait <Counter canCount={canCount} to={timer} steps={1} onCountOver={() => onCountOver(true)} reverse />{' '}
              seconds to request again
            </span>
          }
          invalid={errors?.otpCode ? true : false}
          onChange={() => {
            setShowErrors({ otp: false })
          }}
          errormsg={errors?.otpCode?.type === 'required' && 'Please check your inbox and enter the OTP password given.'}
          ref={register({ required: true })}
        />

        {isError && errorType === 'confirm' && showErrors.otp && extractErrorStatus(errorConfirm)}
        {isError && errorType === 'confirm' && showErrors.otp && extractErrorStatus(errorReset)}
        {isError && errorType === 'confirm' && showErrors.otp && extractErrorStatus(errorResetEmail)}
        {isError && errorType === 'confirm' && showErrors.otp && extractErrorMessage(errorConfirm)}
        {isError && errorType === 'confirm' && showErrors.otp && extractErrorMessage(errorReset)}
        {isError && errorType === 'confirm' && showErrors.otp && extractErrorMessage(errorResetEmail)}
        {isError && errorType === 'resend' && showErrors.otp && extractErrorPassResetMessage(errorResendReset)}
        {isError && errorType === 'resend' && showErrors.otp && extractErrorPassResetMessage(errorResend)}
        {isError && errorType === 'resend' && showErrors.otp && extractErrorResetEmail(errorResendResetEmail)}
        {(dataResend || dataResendReset || dataResendResetEmail) && !isError && (
          <p>{['Please check your ', ' for the new OTP'].join(isEmail ? 'email' : 'phone')}</p>
        )}
      </div>
      <div css={ButtonWrapper}>
        <Button type="submit" className="w-100">
          Continue
        </Button>
      </div>
    </form>
  )
}
