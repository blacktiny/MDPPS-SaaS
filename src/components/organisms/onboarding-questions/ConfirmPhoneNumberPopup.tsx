import React, { FunctionComponent, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import Input from '../../atoms/Input'
import Counter from '../../atoms/Counter'
import ConfirmModalTemplate from '../../templates/ConfirmModalTemplate'
import axios from 'utils/http/client'
import './style.scss'

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

const BoldPhoneNumber = styled.span`
  font-weight: bold;
  color: black;
`

const Resend = styled.span`
  font-size: 12px;
  color: #4284fc !important;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const OTP_TYPO_MSG = 'Please check your inbox and enter the OTP password given'
const OTP_INVALID_MSG = 'The entered OTP is incorrect, please try again'
// const API_ERROR_MSG = 'API ERROR'

interface Props {
  show: boolean
  handleClose: (show: boolean) => void
  phoneNumber: string
  submitOTP: (code: string) => void
}

const Container = styled.div``

const ConfirmPhoneNumberPopup: FunctionComponent<Props> = props => {
  const { show, handleClose, phoneNumber, submitOTP } = props

  const [enteredOTP, setEnteredOTP] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState(OTP_TYPO_MSG)
  const [showCounter, setShowCounter] = useState(true)

  const handelCloseModal = () => {
    handleClose(false)
  }

  const handleChange = useCallback(value => {
    setEnteredOTP(value.replace(/[^0-9.]/g, ''))
  }, [])

  const handleResendOTP = useCallback(() => {
    axios({
      url: 'users/newmobile/',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: {
        new_mobile: '+' + phoneNumber
      }
    })
      .then(response => {
        const { status } = response
        if (status === 200) {
          setShowCounter(true)
        }
      })
      .catch(error => {
        console.log('[API PUT /users/newmobile] error = ', error)
      })
  }, [phoneNumber])

  const handleConfirmModal = useCallback(() => {
    if (enteredOTP.length < 6) {
      setShowErrorMsg(true)
      setErrorMsg(OTP_TYPO_MSG)

      setTimeout(() => setShowErrorMsg(false), 5000)
    } else {
      axios({
        url: 'users/newmobile/confirm',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: {
          token: enteredOTP
        }
      })
        .then(response => {
          const { status } = response
          if (status === 200) {
            submitOTP(enteredOTP)
            handleClose(false)
          } else {
            setShowErrorMsg(true)
            setErrorMsg(OTP_INVALID_MSG)
          }
        })
        .catch(error => {
          setShowErrorMsg(true)
          setErrorMsg(OTP_INVALID_MSG)
          console.log('[API PUT /users/newmobile/confirm] error = ', error)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredOTP])

  return (
    <Container>
      <ConfirmModalTemplate
        contentText={
          <p>
            For your security we need to authenticate your request. We`ve sent a One Time Password(OTP) to{' '}
            <BoldPhoneNumber>{formatPhoneNumberIntl('+' + phoneNumber)}</BoldPhoneNumber>. Please enter it below.
          </p>
        }
        size="md"
        showPopup={show}
        title={'Confirm Your Phone Number'}
        handleClose={handelCloseModal}
        handleConfirm={handleConfirmModal}
      >
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
            errormsg={showErrorMsg && errorMsg}
            onChange={handleChange}
            showErrorWrapper={true}
          />
        </OtpWrapper>
      </ConfirmModalTemplate>
    </Container>
  )
}
export default ConfirmPhoneNumberPopup
