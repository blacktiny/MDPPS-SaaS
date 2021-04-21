/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { Dispatch } from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from '@reach/router'
import { AxiosError } from 'axios'
import Input from '../../../../components/atoms/Input'
import Button from '../../../../components/atoms/Button'
import { ButtonWrapper } from '../../../../utils/style'
import {
  extractErrorPassResetMessage,
  extractErrorMessage
} from '../../../../utils/data'
import { RegexPatterns } from '../../../../constants/common'

type FormData = {
  email: string
}

interface Props extends RouteComponentProps {
  onSubmit: (data: FormData) => void
  error: AxiosError
  setShowErrors: React.Dispatch<
    React.SetStateAction<{
      email: boolean
    }>
  >
  showErrors: {
    email: boolean
  }
}

export const AccountUnlockForm: React.FC<Props> = ({
  onSubmit,
  error,
  showErrors,
  setShowErrors
}) => {
  const { register, handleSubmit, errors } = useForm<FormData>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-20">
        <Input
          name="email"
          id="email"
          placeholder="Your@email.com"
          onChange={() => {
            setShowErrors({ email: false })
          }}
          label="Email"
          invalid={errors?.email ? true : false}
          errormsg={
            (errors?.email?.type === 'required' &&
              'Please enter your email address') ||
            (errors?.email?.type === 'pattern' &&
              'Please enter a valid email address ')
          }
          ref={register({
            required: true,
            pattern: RegexPatterns.EMAIL
          })}
        />

        {!error?.response?.data?.errors &&
          showErrors.email &&
          extractErrorMessage(error)}
        {error?.response?.data?.errors &&
          showErrors.email &&
          extractErrorPassResetMessage(error)}
      </div>
      <div css={ButtonWrapper}>
        <Button type="submit" className="w-100">
          Continue
        </Button>
      </div>
    </form>
  )
}
