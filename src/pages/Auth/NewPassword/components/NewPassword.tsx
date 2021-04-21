import { navigate } from '@reach/router'
import React, { useEffect, useState } from 'react'
import { Loader } from '../../../../components/atoms/Loader'
import { LOGIN } from '../../../../constants/pagesPath'
import { clearConsole } from '../../../../utils/console/clearConsole'
import axios from '../../../../utils/http/client'
import { Form } from './form'

type FormData = {
  password: string
  password_repeat: string
}

interface Props {
  otp: string
}
export const NewPassword: React.FC<Props> = ({ otp }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [showErrors, setShowErrors] = useState({
    password: false
  })

  useEffect(() => {
    if (data) {
      navigate(LOGIN)
    }
  })

  const onSubmit = (data: FormData) => {
    setShowErrors({
      password: true
    })
    const form = new FormData()
    form.set('token', otp)
    form.set('password', data.password)

    delete data.password_repeat
    setLoading(true)
    axios({ url: 'users/password-reset/confirm/', method: 'POST', data: form })
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
      <Form
        onSubmit={onSubmit}
        error={error}
        setShowErrors={setShowErrors}
        showErrors={showErrors}
      />
    </>
  )
}
