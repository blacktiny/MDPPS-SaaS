import React, { useEffect, useState } from 'react'
import { navigate, RouteComponentProps } from '@reach/router'
import { PasswordResetForm } from './form'
import { Loader } from '../../../../components/atoms/Loader'
import axios from '../../../../utils/http/client'
import { OTP } from '../../../../constants/pagesPath'
import { clearConsole } from '../../../../utils/console/clearConsole'

export const PasswordReset: React.FC<RouteComponentProps> = () => {
  const [email, setEmail] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [showErrors, setShowErrors] = useState({
    email: false
  })

  useEffect(() => {
    if (data) {
      // in success will redirect user to confirm OTP
      navigate(OTP, {
        state: { fromPage: 'reset-password', email: email || phoneNumber }
      })
    }
  }, [data, email, loading, phoneNumber])

  const onSubmit = (data: {
    type: 'email' | 'sms'
    email: string
    number: string
  }) => {
    const form = new FormData()
    if (data.type === 'email') {
      setShowErrors({
        email: true
      })
      setEmail(data.email)
      form.set('email', data.email)
    } else if (data.type === 'sms') {
      setShowErrors({
        email: true
      })
      setPhoneNumber(data.number)
      form.set('email', data.number)
    }
    setLoading(true)
    axios({ url: 'users/password-reset/', method: 'POST', data: form })
      .then(data => {
        setData(data?.data)
      })
      .catch(err => {
        clearConsole()
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      {loading && <Loader />}
      <PasswordResetForm
        onSubmit={onSubmit}
        error={error}
        setShowErrors={setShowErrors}
        showErrors={showErrors}
      />
    </>
  )
}
