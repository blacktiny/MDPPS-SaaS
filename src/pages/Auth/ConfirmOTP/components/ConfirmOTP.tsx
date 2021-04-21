import { navigate } from '@reach/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { RegexPatterns } from '../../../../constants/common'
import { LOGIN, NEW_PASSWORD, ONBOARDING, CONFIRM_CURRENT_EMAIL, CONFIRM_NEW_EMAIL } from '../../../../constants/pagesPath'
import { setToken, setUserData, setUserUpdate } from '../../../../store/auth'
import { clearConsole } from '../../../../utils/console/clearConsole'
import axios from '../../../../utils/http/client'
import Button from '../../../../components/atoms/Button'
import { Loader } from '../../../../components/atoms/Loader'
import { ConfirmOTPForm } from './form'

interface Props {
  email: string
  fromPage: string
  timerMin?: number
  timerMax?: number
  maxOTPResendAttemptSequentially?: number
  oTPResendAttemptTimeInterval?: number
}

export const ConfirmOTP: React.FC<Props> = ({
  maxOTPResendAttemptSequentially = 5,
  oTPResendAttemptTimeInterval = 30,
  ...props
}) => {
  const [otp, setOTP] = useState(null)
  const [IsError, setIsError] = useState(false)
  const [errorType, setErrorType] = useState('')
  const dispatch = useDispatch()
  const [showErrors, setShowErrors] = useState({
    otp: false
  })

  const [dataConfirm, setDataConfirm] = useState(null)
  const [loadingConfirm, setLoadingConfirm] = useState(false)
  const [errorConfirm, setErrorConfirm] = useState(null)

  const [dataResend, setDataResend] = useState(null)
  const [loadingResend, setLoadingResend] = useState(false)
  const [errorResend, setErrorResend] = useState(null)

  const [dataReset, setDataReset] = useState(null)
  const [loadingReset, setLoadingReset] = useState(false)
  const [errorReset, setErrorReset] = useState(null)

  const [dataResendReset, setDataResendReset] = useState(null)
  const [loadingResendReset, setLoadingResendReset] = useState(false)
  const [errorResendReset, setErrorResendReset] = useState(null)

  const [dataResetEmail, setDataResetEmail] = useState(null)
  const [loadingResetEmail, setLoadingResetEmail] = useState(false)
  const [errorResetEmail, setErrorResetEmail] = useState(null)

  const [dataResendResetEmail, setDataResendResetEmail] = useState(null)
  const [loadingResendResetEmail, setLoadingResentResetEmail] = useState(false)
  const [errorResendResetEmail, setErrorResendResetEmail] = useState(null)

  const [userData, setuserData] = useState(null)
  const [userDataLoading, setUserDataLoading] = useState(false)

  const [canCount, setCanCount] = useState(false)
  const [countResendOTP, setCountResendOTP] = useState(0)

  useEffect(() => {
    if (countResendOTP === maxOTPResendAttemptSequentially) {
      navigate(LOGIN)
    }
  }, [countResendOTP, maxOTPResendAttemptSequentially])

  useEffect(() => {
    if (!loadingReset && dataReset) {
      // in success will redirect user to reset new password screen
      navigate(NEW_PASSWORD, { state: { otp: otp } })
    }
  }, [loadingReset, dataReset, otp])

  useEffect(() => {
    if (
      (!loadingResend && dataResend) ||
      (!loadingResendReset && dataResendReset) ||
      (!loadingResendResetEmail && dataResendResetEmail)
    ) {
      setIsError(false)
    }
  }, [loadingResend, dataResend, loadingResendReset, dataResendReset, loadingResendResetEmail, dataResendResetEmail])

  useEffect(() => {
    if (
      (!loadingResend && errorResend) ||
      (!loadingResendReset && errorResendReset) ||
      (!loadingResendResetEmail && errorResendResetEmail)
    ) {
      setIsError(true)
      setErrorType('resend')
    }
  }, [errorResend, errorResendReset, loadingResend, loadingResendReset, loadingResendResetEmail, errorResendResetEmail])

  useEffect(() => {
    if ((!loadingConfirm && errorConfirm) || (!loadingReset && errorReset) || (!loadingResetEmail && errorResetEmail)) {
      setIsError(true)
      setErrorType('confirm')
    }
  }, [loadingReset, errorConfirm, errorReset, loadingConfirm, loadingResetEmail, errorResetEmail])

  useEffect(() => {
    if (dataConfirm) {
      dispatch(setToken(dataConfirm))
      setUserDataLoading(true)
      axios({ url: 'users/me' })
        .then(data => {
          setuserData(data?.data)
        })
        .catch(() => {
          clearConsole()
        })
        .finally(() => {
          setUserDataLoading(false)
        })
    }
  }, [dataConfirm, dispatch])

  useEffect(() => {
    if (userData) {
      // now redirect to brands page
      dispatch(setUserData(userData))
      navigate(props?.fromPage === 'register' ? ONBOARDING : CONFIRM_CURRENT_EMAIL)
    }
  }, [dispatch, props, userData])

  useEffect(() => {
    if (!loadingResetEmail && dataResetEmail) {
      dispatch(setUserUpdate({ email: props.email }))
      navigate(CONFIRM_NEW_EMAIL)
    }
  }, [dataResetEmail, dispatch, loadingResetEmail, props.email])

  const onSubmit = ({ otpCode }: { otpCode: string }) => {
    setShowErrors({
      otp: true
    })
    const form = new FormData()
    if (props?.fromPage === 'register' || props?.fromPage === 'current-email') {
      // in case of confirm sign up

      if (props.email) {
        form.set('token', otpCode)
        form.set('email', props.email)
        setLoadingConfirm(true)
        axios({ url: 'users/confirm/', method: 'POST', data: form })
          .then(data => {
            setDataConfirm(data?.data)
          })
          .catch(err => {
            clearConsole()
            setErrorConfirm(err)
          })
          .finally(() => {
            setLoadingConfirm(false)
          })
      }
    } else if (props?.fromPage === 'reset-password') {
      // in case or forget password
      form.set('token', otpCode)
      setOTP(otpCode)
      setLoadingReset(true)
      axios({
        url: 'users/password-reset/validate_token/',
        method: 'POST',
        data: form
      })
        .then(data => {
          setDataReset(data?.data)
        })
        .catch(err => {
          clearConsole()
          setErrorReset(err)
        })
        .finally(() => {
          setLoadingReset(false)
        })
    } else {
      form.set('email_token', otpCode)
      setLoadingResetEmail(true)
      axios({
        url: 'users/newemail/confirm',
        method: 'PUT',
        data: form
      })
        .then(() => {
          setDataResetEmail(props.email)
        })
        .catch(err => {
          clearConsole()
          setErrorResetEmail(err)
        })
        .finally(() => {
          setLoadingResetEmail(false)
        })
    }
  }

  const resendOTP = () => {
    setCanCount(true)
    setCountResendOTP(prev => prev + 1)
    // call the resend OTP here
    setShowErrors({
      otp: true
    })
    const form = new FormData()
    if (props.email) {
      if (props?.fromPage === 'register') {
        // in case of confirm sign up
        form.set('email', props.email)
        setLoadingResend(true)
        axios({
          url: 'users/resend/',
          method: 'POST',
          data: form
        })
          .then(data => {
            setDataResend(data?.data)
          })
          .catch(err => {
            clearConsole()
            setErrorResend(err)
          })
          .finally(() => {
            setLoadingResend(false)
          })
      } else if (props?.fromPage === 'reset-password') {
        // in case of forget password
        form.set('email', props.email)
        setLoadingResendReset(true)
        axios({
          url: 'users/password-reset/',
          method: 'POST',
          data: form
        })
          .then(data => {
            setDataResendReset(data?.data)
          })
          .catch(err => {
            clearConsole()
            setErrorResendReset(err)
          })
          .finally(() => {
            setLoadingResendReset(false)
          })
      } else {
        // in case of create a new email
        form.set('new_email', props.email)
        setLoadingResentResetEmail(true)
        axios({
          url: 'users/newemail/',
          method: 'PUT',
          data: form
        })
          .then(data => {
            setDataResendResetEmail(data?.data)
          })
          .catch(err => {
            clearConsole()
            setErrorResendResetEmail(err)
          })
          .finally(() => {
            setLoadingResentResetEmail(false)
          })
      }
    }
  }

  return (
    <>
      {(loadingConfirm ||
        loadingReset ||
        loadingResend ||
        loadingResendReset ||
        loadingResendResetEmail ||
        loadingResetEmail ||
        userDataLoading) && <Loader />}
      <ConfirmOTPForm
        isEmail={RegexPatterns.EMAIL.test(props.email)}
        onSubmit={onSubmit}
        errorConfirm={errorConfirm}
        errorReset={errorReset}
        errorResend={errorResend}
        errorResendReset={errorResendReset}
        errorResendResetEmail={errorResendResetEmail}
        errorResetEmail={errorResetEmail}
        dataResend={dataResend}
        dataResendReset={dataResendReset}
        dataResendResetEmail={dataResendResetEmail}
        isError={IsError}
        errorType={errorType}
        setShowErrors={setShowErrors}
        showErrors={showErrors}
        timer={oTPResendAttemptTimeInterval}
        canCount={canCount}
        onCountOver={() => setCanCount(false)}
      />
      <Button className="mt-7" link end onClick={resendOTP} disabled={loadingResend || canCount}>
        Resend OTP
      </Button>
    </>
  )
}
