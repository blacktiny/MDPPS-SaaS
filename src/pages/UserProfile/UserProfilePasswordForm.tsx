/** @jsx jsx */
import { jsx } from '@emotion/core'
import {
  useRef,
  useState,
  FunctionComponent,
  useContext,
  useCallback
} from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../components/atoms/Input'
import { ErrorMsg } from '../../utils/style'
import Button from '../../components/atoms/Button'
import { ButtonWrapper, FlexBetween } from '../../utils/style'
import Card from '../../components/atoms/Card'
import axios from '../../utils/http/client'
import { AxiosError } from 'axios'
import styled from '@emotion/styled'
import { NotificationBarContext } from '../../shared/context/NotificationBarProvider'

const ProfileCardRight = styled.div`
  padding: 3.563rem 6.25rem 2.313rem;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 1px 10px #00000012;
  border-radius: 4px;
  @media only screen and (max-width: 990px) {
    padding: 3.563rem 1.875rem;
  }
`
const ProfileInputField = styled.div`
  margin-bottom: 2.375rem;
  position: relative;
  .control-label {
    width: 40%;
  }
  .help-block {
    width: 60%;
    text-align: right;
    position: relative;
    top: 0.625rem;
  }
`

const ErrorMessageContainer = styled.div`
  align-text: center;
`
const ForgotPasswordProfile = styled.div`
  position: absolute;
  right: 0;
  top: 2px;
  button {
    color: #4284fc;
    font-size: 0.75rem;
    &:hover {
      text-decoration: none;
    }
  }
`
const ProfileNewPasswordInputField = styled.div`
  .control-label {
    position: relative;
    top: 0.5rem;
  }
`
const FormButtonWrapper = styled.div`
  button {
    &:disabled {
      background-color: #f5f8fa !important;
      font-family: roboto-medium;
      font-weight: normal;
      color: #e1e8ed !important;
      &:hover {
        background-color: #f5f8fa !important;
      }
    }
  }
`

interface FormDataType {
  password: string
  old_password: string
}

interface Props {
  showForgotPasswordModal: () => void
  toggleLoader: (value: boolean) => void
}

const UserProfilePasswordForm: FunctionComponent<Props> = props => {
  const { showNotification } = useContext(NotificationBarContext)
  const { showForgotPasswordModal, toggleLoader } = props
  const [apiErrors, setApiErrors] = useState<AxiosError>(null)
  const [showErrors, setShowErrors] = useState({
    password: true,
    old_password: true
  })

  const {
    register,
    handleSubmit,
    errors,
    formState,
    watch,
    reset,
    getValues
  } = useForm<FormDataType>({
    mode: 'onChange'
  })

  const passwordStrengthValidaton = useRef(0)

  const updateScoreRef = (value: number) => {
    passwordStrengthValidaton.current = value
  }

  const formSubmit = (data: FormDataType) => {
    toggleLoader(true)
    axios({
      method: 'put',
      data: data,
      url: `users/password`,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        showNotification({
          notificationText: 'Changes successfully saved',
          notificationType: 'success'
        })
        setApiErrors(null)
        reset()
      })
      .catch(error => {
        showNotification({
          notificationText: 'Your changes could not be saved, please try again',
          notificationType: 'error'
        })
        setApiErrors(error)
        setShowErrors({
          password: true,
          old_password: true
        })
      })
      .finally(() => {
        toggleLoader(false)
      })
  }

  const checkNewAndOldPasswordEqual = useCallback(() => {
    if (formState.isValid && getValues().password === getValues().old_password)
      return true
    return false
  }, [getValues, formState])

  const isReadyToSubmit = useCallback(() => {
    if (!formState.isValid) return true
    if (checkNewAndOldPasswordEqual()) return true
    return false
  }, [formState, checkNewAndOldPasswordEqual])

  return (
    <Card>
      <ProfileCardRight data-testid="UserProfile-PasswordsForm">
        <form data-testid={'form'} onSubmit={handleSubmit(formSubmit)}>
          <ProfileInputField>
            <Input
              label="Current Password"
              placeholder="Your current password"
              name="old_password"
              type="password"
              onChange={() => {
                setShowErrors({ ...showErrors, old_password: false })
              }}
              invalid={errors?.old_password ? true : false}
              ref={register({
                validate: value => {
                  return !value ? 'Please enter your current password' : true
                }
              })}
              errormsg={
                errors?.old_password?.type === 'validate' &&
                (errors?.old_password?.message as string)
              }
            />
            <ErrorMessageContainer>
              <ErrorMsg>
                {showErrors.old_password &&
                  apiErrors?.response?.data?.errors?.old_password?.[0].includes(
                    'Wrong password'
                  ) &&
                  'Your current password is incorrect'}
              </ErrorMsg>
            </ErrorMessageContainer>
            <ForgotPasswordProfile css={FlexBetween}>
              <Button link onClick={showForgotPasswordModal}>
                forgot my password
              </Button>
            </ForgotPasswordProfile>
          </ProfileInputField>
          <ProfileInputField>
            <ProfileNewPasswordInputField>
              <Input
                testErrorId={'userprofile-newpassword'}
                label="New Password"
                placeholder="Your new password"
                name="password"
                type="password"
                showPasswordStatus
                onChange={() => {
                  setShowErrors({ ...showErrors, password: false })
                }}
                characters={watch('password')}
                invalid={errors?.password ? true : false}
                text="Your password needs to have at least one upper case letter, a symbol, a number and contain a minimum of 8 characters"
                updateScoreRef={updateScoreRef}
                ref={register({
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/,
                    message:
                      'Your password needs to have at least one upper case letter, a symbol, a number and contain a minimum of 8 characters'
                  },
                  validate: value => {
                    if (!value) return 'Please enter a password'
                    return true
                  }
                })}
                errormsg={errors?.password?.message as string}
              />
              <ErrorMsg>
                {checkNewAndOldPasswordEqual()
                  ? 'Your new password must be different from your previous password'
                  : showErrors.password &&
                    apiErrors?.response?.data?.errors?.password?.[0]}
              </ErrorMsg>
            </ProfileNewPasswordInputField>
          </ProfileInputField>
          <FormButtonWrapper
            css={ButtonWrapper}
            className="justify-content-end"
          >
            <Button disabled={isReadyToSubmit()} type="submit">
              Update Password
            </Button>
          </FormButtonWrapper>
        </form>
      </ProfileCardRight>
    </Card>
  )
}

export default UserProfilePasswordForm
