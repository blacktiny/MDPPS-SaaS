import { useEffect, useState, useMemo } from 'react'
import { useStore } from 'react-redux'
import qs from 'querystring'
import { Method } from 'axios'
import { navigate } from '@reach/router'

import { AuthState } from '../store/auth'
import axios from '../utils/http/client'
import { clearConsole } from '../utils/console/clearConsole'

interface Headers {
  'Content-Type': string
}

const useCustomFetch = (method: Method, url: string, headers: Headers) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState<boolean>(true)

  const [reload, setReload] = useState<boolean>(true)

  const store = useStore()
  const auth: AuthState = store.getState()?.auth
  const token = auth?.token?.access_token

  const data = useMemo(
    () =>
      qs.stringify({
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        token: token
      }),
    [token]
  )

  useEffect(() => {
    if (reload) {
      setLoading(true)
      axios({
        method,
        url: url,
        headers,
        data
      })
        .then(data => {
          setResponse(data)
          setLoading(false)
          setReload(false)
        })
        .catch(err => {
          if (auth)
            navigate('/dashboard/home/error', {
              state: { code: err.response?.status || undefined }
            })
          else
            navigate('/error', {
              state: { code: err.response.status }
            })
          setError(err)
          setLoading(false)
          setReload(false)
          clearConsole()
        })
    }
  }, [auth, data, headers, method, reload, url])

  const handleOnReload = () => setReload(true)

  return [response, handleOnReload, loading, error]
}

export default useCustomFetch
