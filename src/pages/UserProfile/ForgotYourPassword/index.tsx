/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import React, { FunctionComponent, memo, useCallback, useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { RadioGroup } from 'rsuite'
import { NotificationBarContext } from '../../../shared/context/NotificationBarProvider'
import { OTP } from '../../../constants/pagesPath'
import { resetToken, resetUserData } from '../../../store/auth'
import { clearConsole } from '../../../utils/console/clearConsole'
import axios from '../../../utils/http/client'
import RadioButton from '../../../components/atoms/RadioButton'
import ConfirmModalTemplate from '../../../components/templates/ConfirmModalTemplate'

interface Props {
  show: boolean
  handleClose: (show: boolean) => void
  currentUserEmailId: string
  currentUserPhoneNumber: string
  toggleLoader: (value: boolean) => void
}

const RadioGroupStyled = styled(RadioGroup)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 35px;
  margin-top: 22px;

  .rs-radio-checker {
    font-size: 14px;
  }
`

const RadioButtonContainer = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    border-radius: 4px;
    border: 1px solid #b6d0fd;
  }

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`

const RadioButtonStyled = styled(RadioButton)`
  text-align: left;
  width: 100%;
  & span.dark {
    font-weight: 500;
    color: #0f203c;
  }
`

const cssActive = css`
  border-radius: 4px;
  border: 1px solid #b6d0fd;
  background-color: #f7faff;
`

const cssInactive = css`
  border-radius: 4px;
  border: 1px solid #f4f5f8;
  background-color: #ffffff;
`

const ForgotYourPassword: FunctionComponent<Props> = props => {
  const [type, setType] = useState<'email' | 'sms'>('email')
  const [disabledToSend, setDisabledToSend] = useState<boolean>(false)
  const { showNotification } = useContext(NotificationBarContext)

  const { show, handleClose, currentUserEmailId, currentUserPhoneNumber, toggleLoader } = props
  const dispatch = useDispatch()

  const redirectOTPPage = useCallback(
    async (email: string) => {
      await navigate(OTP, {
        state: { fromPage: 'reset-password', email: email }
      })
      dispatch(resetUserData())
      dispatch(resetToken())
    },
    [dispatch]
  )

  const handelOnSendLink = useCallback(() => {
    const userEmail = currentUserEmailId
    const userPhoneNumber = currentUserPhoneNumber
    const form = new FormData()
    if (type === 'email') {
      form.set('email', userEmail)
    } else if (type === 'sms') {
      form.set('email', userPhoneNumber)
    }
    handleClose(false)
    toggleLoader(true)
    axios({ url: 'users/password-reset/', method: 'POST', data: form })
      .then(() => {
        redirectOTPPage(form.get('email').toString())
      })
      .catch(apiError => {
        clearConsole()
        showNotification({
          notificationText: `${apiError?.response?.data?.errors?.email[0] || apiError?.response?.data?.message}`,
          notificationType: 'error'
        })
      })
      .finally(() => {
        toggleLoader(false)
      })
  }, [currentUserEmailId, currentUserPhoneNumber, handleClose, redirectOTPPage, showNotification, toggleLoader, type])

  const modalClassNames = {
    container: 'forgotyourpassword'
  }

  return (
    <React.Fragment>
      <ConfirmModalTemplate
        classNames={modalClassNames}
        contentText={`Select one of the options below and we'll send you a one time password (OTP) to update your account.`}
        disabledConfirm={disabledToSend}
        showPopup={show}
        size="sm"
        title={'Forgot your password?'}
        handleClose={() => handleClose(false)}
        handleConfirm={handelOnSendLink}
      >
        <RadioGroupStyled value={type}>
          <RadioButtonContainer css={type === 'email' ? cssActive : cssInactive}>
            <RadioButtonStyled
              label="Send email to: "
              value={'email'}
              onChange={() => {
                setType('email')
                setDisabledToSend(false)
              }}
              checked
            >
              <span className="dark">{currentUserEmailId}</span>
            </RadioButtonStyled>
          </RadioButtonContainer>
          <RadioButtonContainer
            css={type === 'sms' ? cssActive : cssInactive}
            className={currentUserPhoneNumber ? '' : 'disabled'}
          >
            <RadioButtonStyled
              label="Send SMS:"
              value={'sms'}
              onChange={() => {
                setType('sms')
                setDisabledToSend(false)
              }}
            >
              <span className="dark">
                {`${currentUserPhoneNumber
                  ?.split('')
                  .map((item, key, array) => (key <= array.length - 5 ? '*' : item))
                  .join('')}`}
              </span>
            </RadioButtonStyled>
          </RadioButtonContainer>
        </RadioGroupStyled>
      </ConfirmModalTemplate>
    </React.Fragment>
  )
}
export default memo(ForgotYourPassword)
