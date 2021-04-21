import React, { useEffect, useState } from 'react'
import { navigate, RouteComponentProps } from '@reach/router'
import { AccountUnlockForm } from './form'
import { Loader } from '../../../../components/atoms/Loader'
import axios from '../../../../utils/http/client'
import { OTP } from '../../../../constants/pagesPath'
import { clearConsole } from '../../../../utils/console/clearConsole'

export const AccountUnlock: React.FC<RouteComponentProps> = () => {
  const [email, setEmail] = useState(null)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [showErrors, setShowErrors] = useState({
    email: false
  })

  useEffect(() => {
    if (data) {
      // in success will redirect user to confirm OTP
      navigate(OTP, { state: { fromPage: 'reset-password', email: email } })
    }
  }, [data, email, loading])

  const onSubmit = ({ email }: { email: string }) => {
    setShowErrors({
      email: true
    })
    setEmail(email)
    const form = new FormData()
    form.set('email', email)
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
      <AccountUnlockForm
        onSubmit={onSubmit}
        error={error}
        setShowErrors={setShowErrors}
        showErrors={showErrors}
      />
    </>
  )
}
