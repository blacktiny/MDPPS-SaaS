import React, { useEffect, useCallback } from 'react'
import { configure } from 'axios-hooks'
import client from '../../utils/http/client'
import { useStore, useDispatch } from 'react-redux'
import { AuthState, resetUserData, resetToken } from '../../store/auth'
import { navigate } from '@reach/router'
import { LOGIN } from '../../constants/pagesPath'
import { resetLocation } from '../../store/options'

const checkRequests = (Wrapped: React.FC) => {
  function CheckRequests(props = {}) {
    const store = useStore()
    const dispatch = useDispatch()

    useEffect(() => {
      configure({
        axios: client
      })
    }, [])

    const logout = useCallback(() => {
      dispatch(resetUserData())
      dispatch(resetToken())
      dispatch(resetLocation())
      //we will redirect user into login page
      navigate(LOGIN)
    }, [dispatch])

    useEffect(() => {
      client.interceptors.response.use(
        response => {
          return response
        },
        error => {
          switch (error?.response?.status) {
            case 401:
              logout()
              return

            default:
              break
          }
          return Promise.reject(error)
        }
      )
    }, [logout])

    useEffect(() => {
      client.interceptors.request.use(
        request => {
          const auth: AuthState = store.getState()?.auth
          const token = auth?.token?.access_token
          const lang = auth?.user?.language
          if (token) {
            request.headers.Authorization = `Bearer ${token}`
          }

          if (lang) {
            request.headers['Accept-Language'] = lang
          }

          return request
        },
        error => {
          return Promise.reject(error)
        }
      )
    }, [store])

    return <Wrapped {...props} />
  }
  return CheckRequests
}

export default checkRequests
