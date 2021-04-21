/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { AxiosError } from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import ElephantAnimal from '../../../../assets/images/elephant-vector.svg'
import FoxAnimal from '../../../../assets/images/fox-vector.svg'
import variables from '../../../../assets/styles/variables'
import { RegexPatterns } from '../../../../constants/common'
import { PASSWORD_RESET, SIGNUP } from '../../../../constants/pagesPath'
import { extractErrorMessage } from '../../../../utils/data'
import rfs, { boxModel, ButtonWrapper, FlexBetween, mq } from '../../../../utils/style'
import Button from '../../../../components/atoms/Button'
import Checkbox from '../../../../components/atoms/Checkbox'
import Input from '../../../../components/atoms/Input'

interface FormData {
  username: string
  password: string
}

interface LoginFormProps {
  isRememberDevice: boolean
  error?: AxiosError
  onSubmit: (data: FormData) => void
  handleChangeRememberDevice: () => void
}

const { Colors } = variables

const ElephantVector = styled.img`
  height: 100%;
  max-width: ${boxModel('250px')};
  max-height: ${boxModel('187px')};
  position: absolute;
  right: -184px;
  bottom: -108px;
  ${mq({
    display: [`none`, ``, ``, ``, `block`]
  })}
`

const FoxVector = styled.img`
  position: absolute;
  top: -90px;
  left: 20px;
  height: 100%;
  max-width: ${boxModel('115px')};
  max-height: ${boxModel('119px')};
  ${mq({
    display: [`none`, ``, ``, ``, `block`]
  })}
`

const AccountHint = styled.span`
  font-size: ${rfs('14px')};
  color: ${Colors.Gray[500]};
  transition: all 0.5s ease-in-out;
  letter-spacing: 0.28px;
  padding-right: ${boxModel('6px')};
`

const PasswordInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  Button:first-of-type:not(.visibility) {
    margin-bottom: -1.25rem;
    z-index: 2;
  }
`

export const Form: React.FC<LoginFormProps> = props => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const {
    isRememberDevice,
    error,
    onSubmit,
    handleChangeRememberDevice
  } = props

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FoxVector src={FoxAnimal} alt="" />
      <div className="mb-40">
        <Input
          name={`username`}
          type="text"
          label="E-mail"
          placeholder="youremail@domain.com"
          ref={register({
            required: true,
            pattern: RegexPatterns.EMAIL
          })}
          invalid={errors?.username ? true : false}
          errormsg={
            (errors?.username?.type === 'required' &&
              'Please enter your email address') ||
            (errors?.username?.type === 'pattern' &&
              'Please enter a valid email address')
          }
        />
      </div>
      <PasswordInputWrapper className="mb-40">
        <Button link onClick={() => navigate(PASSWORD_RESET)}>
          Forgot password?
        </Button>
        <Input
          name={`password`}
          type="password"
          label="Password"
          placeholder="Your password"
          invalid={errors?.password ? true : false}
          ref={register({ required: true })}
          errormsg={
            errors?.password?.type === 'required' &&
            'Please enter your password'
          }
        />
      </PasswordInputWrapper>

      <div css={FlexBetween} className="mb-30 mt-10">
        <Checkbox
          name={`remember_device`}
          checked={isRememberDevice}
          onChange={handleChangeRememberDevice}
          title="Remember this device"
        >
          Remember this device
        </Checkbox>
        <div className="d-flex">
          <AccountHint>{`Don't have an account?`}</AccountHint>
          <Button link onClick={() => navigate(SIGNUP)}>
            Sign up
          </Button>
        </div>
      </div>

      {extractErrorMessage(error)}

      <div css={ButtonWrapper}>
        <Button className="w-100" type="submit">
          Sign in
        </Button>
      </div>

      <ElephantVector src={ElephantAnimal} alt="" />
    </form>
  )
}
