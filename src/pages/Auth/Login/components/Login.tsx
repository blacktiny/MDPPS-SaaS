import { navigate, RouteComponentProps } from '@reach/router'
import qs from 'querystring'
import { setUserData, setToken, switchAccountCompany } from '../../../../store/auth'
import { ActiveCompany, Invite } from '../../../../shared/models/User'
import { Loader } from '../../../../components/atoms/Loader'
import { Form } from './form'
import axios from '../../../../utils/http/client'
import { setUserCrossDomain } from '../../../../utils/data/index'
import { ACCOUNT_UNBLOCK, ONBOARDING, OTP } from '../../../../constants/pagesPath'
import { clearConsole } from '../../../../utils/console/clearConsole'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

type FormData = {
  username: string
  password: string
}

export const Login: React.FC<RouteComponentProps> = ({ location }) => {
  const invited = location?.state as Invite

  const [isRememberDevice, setRememberDevice] = useState(false)
  const [username, setUsername] = useState(null)
  const [data, setData] = useState(null)
  const [userData, setUserD] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    // blocked_account"
    if (error?.response?.data?.error === 'blocked_account') {
      navigate(ACCOUNT_UNBLOCK)
      // email_not_confirmed
    } else if (error?.response?.data?.error === 'email_not_confirmed') {
      navigate(OTP, { state: { fromPage: 'register', email: username } })
    }
  }, [error, username])

  useEffect(() => {
    if (data) {
      dispatch(setToken(data?.data))
      setLoading(true)
      axios({ url: 'users/me' })
        .then(data => {
          setUserD(data?.data)
        })
        .catch(err => {
          clearConsole()
          setError(err)
        })
        .finally(() => {
          setLoading(false)
        })

      if (invited && invited?.destination_object) {
        axios({
          url: `users/me/invitations/accept/`,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify(invited)
        })
          .then(data => {
            console.log('data = ', data)
          })
          .catch(err => {
            console.log('err = ', err)
          })
      }
    }
  }, [data, dispatch, invited])

  useEffect(() => {
    if (userData) {
      // now redirect to brands page
      dispatch(setUserData(userData))

      const relatedCompanies: ActiveCompany[] = userData.companies
      if (relatedCompanies && relatedCompanies.length) {
        // Initial selection of related company
        const selectedCompany: ActiveCompany =
          relatedCompanies.find(
            (company: ActiveCompany) => company.user_permission?.active && company.status === 'active'
          ) || null

        dispatch(switchAccountCompany(selectedCompany))
      }
      localStorage.setItem('loginTime', new Date().toString())
      setUserCrossDomain(userData)
      navigate(ONBOARDING)
    }
  }, [dispatch, userData])

  useEffect(() => {
    if (isRememberDevice) {
      localStorage.setItem('rememberDevice', 'true')
    } else {
      localStorage.removeItem('rememberDevice')
    }
  }, [isRememberDevice])

  const onSubmit = (data: FormData) => {
    setUsername(data?.username)
    setLoading(true)

    axios({
      method: 'POST',
      url: 'oauth/token/',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        grant_type: process.env.REACT_APP_GRANT_TYPE,
        ...data
      })
    })
      .then(data => {
        setData(data)
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
        isRememberDevice={isRememberDevice}
        onSubmit={onSubmit}
        error={error}
        handleChangeRememberDevice={() => {
          setRememberDevice(!isRememberDevice)
        }}
      />
    </>
  )
}
