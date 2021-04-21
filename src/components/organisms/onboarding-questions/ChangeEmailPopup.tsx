import React, { FunctionComponent, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { useDispatch } from 'react-redux'
import Input from '../../atoms/Input'
import Counter from '../../atoms/Counter'
import ConfirmModalTemplate from '../../templates/ConfirmModalTemplate'
import { OTP } from 'constants/pagesPath'
import axios from 'utils/http/client'
import { resetUserData } from 'store/auth'
import './style.scss'

const EmailWrapper = styled.div`
  margin-bottom: 2rem;
`

const OtpWrapper = styled.div`
  margin-bottom: 2rem;
  & > span {
    position: absolute;
    right: 1px;
    font-size: 12px;
    color: #565456;
    font-family: 'Roboto Regular', 'Roboto', sans-serif;
    text-align: right;
    line-height: 20px;
  }
`

const Resend = styled.span`
  font-size: 12px;
  color: #4284fc !important;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

interface Props {
  show: boolean
  handleClose: (show: boolean) => void
  submitOTP: (code: string) => void
  isCustomer?: boolean
}

const Container = styled.div``

const ChangeEmailPopup: FunctionComponent<Props> = props => {
  const { show, handleClose, submitOTP, isCustomer = false } = props

  const [enteredOTP, setEnteredOTP] = useState('')
  const [enteredEmail, setEnteredEmail] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [showCounter, setShowCounter] = useState(true)
  const [isOTPSent] = useState(false)

  const dispatch = useDispatch()

  const handelCloseModal = () => {
    handleClose(false)
  }

  const handleResendOTP = useCallback(() => {
    // axios({
    //   url: 'users/newmobile',
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   data: {
    //     new_mobile: phoneNumber
    //   }
    // })
    //   .then(response => {
    //     const { status } = response
    //     if (status === 200) {
    //       setShowCounter(true)
    //     }
    //   })
    //   .catch(error => {
    //     console.log('[API PUT /users/newmobile] error = ', error)
    //   })
  }, [])

  const handleConfirm = useCallback(() => {
    if (isOTPSent) {
      if (enteredOTP.length < 6) {
        setShowErrorMsg(true)

        setTimeout(() => setShowErrorMsg(false), 5000)
      } else {
        submitOTP(enteredOTP)
        handleClose(false)
      }
    } else {
      if (!enteredEmail || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(enteredEmail)) {
        setShowErrorMsg(true)

        setTimeout(() => setShowErrorMsg(false), 5000)
      } else {
        axios({
          url: 'users/newemail/',
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify({
            new_email: enteredEmail
          })
        })
          .then(response => {
            if (response.status === 200) {
              dispatch(resetUserData())
              navigate(OTP, {
                state: { fromPage: 'profile-edit', email: enteredEmail }
              })
            }
          })
          .catch(error => {
            console.log('[API PUT /users/me] error = ', error)
            // setError(err)
          })
      }
    }
  }, [dispatch, enteredEmail, enteredOTP, handleClose, isOTPSent, submitOTP])

  return (
    <Container>
      <ConfirmModalTemplate
        contentText={
          isOTPSent ? (
            <p>
              For your security we need to authenticate your request and have sent a One Time Password (OTP) to{' '}
              {enteredEmail}. Please enter it below.
            </p>
          ) : (
            <p>
              Enter the new email address you would like to associate with your account. We’ll send a One Time Password
              (OTP) to that address. We recommend using your {isCustomer ? '' : 'company '}email address for
              verification and security.
            </p>
          )
        }
        size="md"
        showPopup={show}
        title={'Change Email Address'}
        handleClose={handelCloseModal}
        handleConfirm={handleConfirm}
      >
        {isOTPSent ? (
          <OtpWrapper>
            {showCounter ? (
              <span>
                Next OTP can be sent in{' '}
                <Counter canCount={true} from={0} to={30} steps={1} reverse onCountOver={() => setShowCounter(false)} />
              </span>
            ) : (
              <Resend onClick={handleResendOTP}>Resend</Resend>
            )}
            <Input
              name={'OTP'}
              id={'OTP'}
              value={enteredOTP}
              placeholder={''}
              label={'Enter OTP'}
              maxLength={6}
              invalid={showErrorMsg}
              errormsg={showErrorMsg && 'Please check your inbox and enter the OTP password given'}
              onChange={value => setEnteredOTP(value)}
              showErrorWrapper={true}
            />
          </OtpWrapper>
        ) : (
          <EmailWrapper>
            <Input
              name={'Email'}
              id={'Email'}
              value={enteredEmail}
              placeholder={'Enter your new email address'}
              invalid={showErrorMsg}
              errormsg={showErrorMsg && 'Please enter a valid email address'}
              onChange={value => setEnteredEmail(value)}
              showErrorWrapper={true}
            />
          </EmailWrapper>
        )}
      </ConfirmModalTemplate>
    </Container>
  )
}

export default ChangeEmailPopup
