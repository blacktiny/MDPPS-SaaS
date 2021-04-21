import React, { useEffect, useState } from 'react'
import { navigate, NavigateFn, WindowLocation } from '@reach/router'
import { useDispatch } from 'react-redux'
import { Form, FormDataType } from './form'
import { Loader } from '../../../../components/atoms/Loader'
import axios from '../../../../utils/http/client'
import { LOGIN, OTP } from '../../../../constants/pagesPath'
import { clearConsole } from '../../../../utils/console/clearConsole'
import { clearOnboarding } from 'store/onboarding/actions'

interface SignUpRouteProps {
  path?: string
  default?: boolean
  location?: WindowLocation
  navigate?: NavigateFn
  uri?: string
  token?: string
}

export const SignUp: React.FC<SignUpRouteProps> = ({ token = '' }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setRegisterD] = useState(null)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    terms_agree: false,
    account_type: '',
    business_name: ''
  })
  const [companyId, setCompanyId] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      axios({
        url: `connections/invitations/${token}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          if (response.data) {
            const {
              type,
              destination_email = '',
              destination_object = '',
              extra_data: { first_name = '', last_name = '' },
              origin_object = ''
            } = response.data

            // for existing employee user
            if (destination_object) {
              navigate(LOGIN, {
                state: {
                  type,
                  destination_email: destination_email,
                  destination_object,
                  extra_data: { first_name, last_name }
                }
              })
            } else {
              // for new employee user
              const arrOriginObject = origin_object.split('/')

              setFormData({
                first_name: first_name,
                last_name: last_name,
                email: destination_email,
                password: '',
                terms_agree: false,
                account_type: 'employee',
                business_name: ''
              })
              setCompanyId(arrOriginObject.length > 0 ? arrOriginObject[arrOriginObject.length - 2] : 0)
            }
          }
        })
        .catch(err => {
          clearConsole()
          setError(err)
        })
    }
  }, [token])

  useEffect(() => {
    if (companyId) {
      axios({
        url: `business/${companyId}/`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          const { data, status } = response

          if (status === 200 && data) {
            setFormData({ ...formData, business_name: data.business_name })
          }
        })
        .catch(err => {
          clearConsole()
          setError(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId])

  useEffect(() => {
    if (data && data.user) {
      dispatch(clearOnboarding())

      navigate(OTP, {
        state: { fromPage: 'register', email: data?.user?.email }
      })
    }
  }, [data, dispatch])

  const onSubmit = (data: FormDataType) => {
    setLoading(true)
    const userData = {
      user: {
        email: data.email,
        password: data.password
      },
      terms_agree: data.terms_agree,
      account_type: data.account_type,
      business_name: token.length > 0 ? companyId : data.business_name
    }

    if (token.length > 0) {
      userData['token_invitation'] = token
    }

    axios({
      url: 'users/register/',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(userData)
    })
      .then(({ data }) => {
        setRegisterD(data)
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
        formData={formData}
        onSubmit={onSubmit}
        error={error}
        invited={token.length > 0}
        company={formData.business_name}
      />
    </>
  )
}
