/** @jsx jsx */
import { jsx } from '@emotion/core'
import { RouteComponentProps } from '@reach/router'
import { AxiosError } from 'axios'
import React, { Dispatch, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { ButtonWrapper } from '../../../../utils/style'
import Button from '../../../../components/atoms/Button'
import Input from '../../../../components/atoms/Input'
import { extractErrorMsgFromArray } from '../../../../utils/data'
import { css } from '@emotion/core'

export const ButtonWrapperCustom = css`
  ${ButtonWrapper};
  margin-top: 3.12rem;
`

type FormData = {
  password: string
  password_repeat: string
}

interface myProps {
  onSubmit: (data: FormData) => void
  error?: AxiosError
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  showErrors: {
    password: boolean
  }
}

type Props = myProps & RouteComponentProps

export const Form: React.FC<Props> = ({
  onSubmit,
  error,
  showErrors,
  setShowErrors
}) => {
  const { register, handleSubmit, errors, watch } = useForm<FormData>()
  const passwordStrengthValidaton = useRef(0)
  const updateScoreRef = (value: number) => {
    passwordStrengthValidaton.current = value
    watch('password')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-20">
        <Input
          name={`password`}
          type="password"
          label="Your New Password"
          placeholder="Your password"
          ref={register({ required: true })}
          updateScoreRef={updateScoreRef}
          text="Password must be at least 8 characters"
          invalid={errors?.password ? true : false}
          characters={watch('password')}
          showPasswordStatus={true}
          onChange={() => {
            setShowErrors({ password: false })
          }}
          errormsg={
            errors?.password?.type === 'required' &&
            'Please enter a new password.'
          }
        />
      </div>
      <div className="mb-20">
        {showErrors.password && extractErrorMsgFromArray(error, 'password')}
      </div>

      <div css={ButtonWrapperCustom}>
        <Button type="submit" className="w-100">
          Confirm
        </Button>
      </div>
    </form>
  )
}
