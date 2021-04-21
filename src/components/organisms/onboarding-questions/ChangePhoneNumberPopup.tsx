import React, { FunctionComponent, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import Input from '../../atoms/Input'
import Counter from '../../atoms/Counter'
import ConfirmModalTemplate from '../../templates/ConfirmModalTemplate'
import MobileInputCode from 'components/organisms/onboarding-questions/PersonalPhoneInputCode'
import { setUserData } from 'store/auth'
import { ErrorMsg } from 'utils/style'
import axios from 'utils/http/client'
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
const PHONE_IN_USE_MSG = 'The mobile phone is already in use.'

interface Props {
  show: boolean
  handleClose: (show: boolean) => void
  submitOTP: (code: string, phoneNumber?: string) => void
  isCustomer?: boolean
}

const Container = styled.div``

const ChangePhoneNumberPopup: FunctionComponent<Props> = props => {
  const { show, handleClose, submitOTP } = props

  const [enteredOTP, setEnteredOTP] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showCounter, setShowCounter] = useState(true)
  const [isOTPSent, setIsOTPSent] = useState(false)

  const dispatch = useDispatch()

  const handelCloseModal = () => {
    handleClose(false)
  }

  const handlePhoneNumberChange = useCallback(data => {
    if (isValidPhoneNumber('+' + data)) {
      setShowErrorMsg(false)
    } else setShowErrorMsg(true)
    setPhoneNumber(data)
  }, [])

  const handleChange = useCallback(value => {
    setEnteredOTP(value.replace(/[^0-9.]/g, ''))
  }, [])

  const handleResendOTP = () => {
    setShowErrorMsg(false)
    setErrorMsg('')
    setEnteredOTP('')
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
          if (!isOTPSent) setIsOTPSent(true)
          setShowCounter(true)
          setErrorMsg(OTP_TYPO_MSG)
        }
      })
      .catch(error => {
        const { data } = error.response
        if (data?.errors?.new_mobile) {
          setShowErrorMsg(true)
          setErrorMsg(PHONE_IN_USE_MSG)
          setTimeout(() => {
            setShowErrorMsg(false)
            setErrorMsg('')
          }, 5000)
        } else {
          console.log('[API PUT /users/newmobile] error = ', error)
        }
      })
  }

  const handleConfirm = useCallback(() => {
    if (isOTPSent) {
      if (enteredOTP.length < 6) {
        setShowErrorMsg(true)

        setTimeout(() => {
          setShowErrorMsg(false)
        }, 5000)
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
              submitOTP(enteredOTP, phoneNumber)
              setIsOTPSent(false)
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
    } else {
      if (phoneNumber.length > 0 && !showErrorMsg) {
        const form = new FormData()
        form.append('mobile_phone_number', '+' + phoneNumber.replace('+', ''))

        axios({
          url: 'users/me',
          method: 'PATCH',
          headers: { 'Content-Type': 'images/jpeg' },
          data: form
        })
          .then(res => {
            dispatch(setUserData(res?.data))
          })
          .catch(error => {
            console.log('[API PUT /users/me] error = ', error)
            // setError(err)
          })

        // send OPT code to phone number
        handleResendOTP()
      } else {
        setShowErrorMsg(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredOTP, handleClose, isOTPSent, phoneNumber, showErrorMsg])

  return (
    <Container>
      <ConfirmModalTemplate
        contentText={
          isOTPSent ? (
            <p>
              For your security we need to authenticate your request. We`ve sent a One Time Password(OTP) to{' '}
              <BoldPhoneNumber>{formatPhoneNumberIntl('+' + phoneNumber)}</BoldPhoneNumber>. Please it it below.
            </p>
          ) : (
            <p>
              Enter the new mobile number you would like to associate with your account. We’ll send a One Time Password
              (OTP) to that number.
            </p>
          )
        }
        size="md"
        showPopup={show}
        title={'Change Phone Number'}
        handleClose={() => {
          handelCloseModal()
          setIsOTPSent(false)
        }}
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
              errormsg={showErrorMsg && errorMsg}
              onChange={handleChange}
              showErrorWrapper={true}
            />
          </OtpWrapper>
        ) : (
          <EmailWrapper>
            <MobileInputCode
              errors={null}
              setPhoneNumber={handlePhoneNumberChange}
              key="phonenumber"
              name={'phonenumber'}
              phoneValue={phoneNumber}
              phoneVerified={false}
              phoneError={showErrorMsg && phoneNumber.length < 1}
              showErrors={{ PhoneNumber: false }}
              setPhoneError={() => {}}
              setShowErrors={() => {}}
              errorExtractedMsg={<ErrorMsg>{'Please enter a valid phone number'}</ErrorMsg>}
            />
            {showErrorMsg && phoneNumber.length > 0 && errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
          </EmailWrapper>
        )}
      </ConfirmModalTemplate>
    </Container>
  )
}

export default ChangePhoneNumberPopup
