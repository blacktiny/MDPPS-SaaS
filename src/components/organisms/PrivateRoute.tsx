import React, { useState, useEffect, useCallback, useRef } from 'react'
import { RouteComponentProps, Redirect } from '@reach/router'
import { LoadableComponent } from '@loadable/component'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'
import axios from '../../utils/http/client'
import { useStore, useDispatch } from 'react-redux'
import { setToken } from '../../store/auth'
import { resetUserData, resetToken } from '../../store/auth'
import { LOGIN } from '../../constants/pagesPath'
import qs from 'querystring'
import { ACCOUNT_TIMEOUT } from '../../constants/common'
import SessionNearExpirePopup from './SessionNearExpirePopup'
import SessionExpirePopup from './SessionExpirePopup'
import { clearConsole } from '../../utils/console/clearConsole'
import { resetLocation } from '../../store/options'
import { navigate } from '@reach/router'

interface Props extends RouteComponentProps {
  as: LoadableComponent<RouteComponentProps<{}>>
}

const PrivateRoute: React.FC<Props> = ({ as: Comp, ...props }) => {
  const dispatch = useDispatch()
  const store = useStore()

  const [callRenewToken, setCallRenewToken] = useState(true)
  const [showPopupSessionNearExpiration, setShowPopupSessionNearExpiration] = useState(false)
  const [showPopupSessionExpire, setShowPopupSessionExpire] = useState(false)

  const [initialTimeout, setInitialTimeout] = useState(true)

  const warnTimeoutRef = useRef(0)
  const logoutTimeout = useRef(0)

  const isAuthenticated = useSelector<RootState>(({ auth }) => auth.token.access_token)

  const warn = () => {
    setShowPopupSessionNearExpiration(true)
  }
  const logout = () => {
    setShowPopupSessionNearExpiration(false)
    setShowPopupSessionExpire(true)
  }
  const setTimeouts = useCallback(() => {
    let auth = store.getState()?.auth
    let time = new Date().getTime() - auth?.token?.time

    if (ACCOUNT_TIMEOUT.warningTime - time > 0) {
      warnTimeoutRef.current = window.setTimeout(warn, ACCOUNT_TIMEOUT.warningTime - time)
    }
    if (ACCOUNT_TIMEOUT.signoutTime - time > 0) {
      logoutTimeout.current = window.setTimeout(logout, ACCOUNT_TIMEOUT.signoutTime - time)
    } else {
      dispatch(resetUserData())
      dispatch(resetToken())
      dispatch(resetLocation())
      navigate(LOGIN)
    }
  }, [store, dispatch])

  const clearTimeouts = useCallback(() => {
    clearTimeout(warnTimeoutRef.current)
    clearTimeout(logoutTimeout.current)
  }, [logoutTimeout])

  const resetTimeout = useCallback(() => {
    clearTimeouts()
    setTimeouts()
  }, [clearTimeouts, setTimeouts])

  useEffect(() => {
    if (initialTimeout) {
      clearTimeouts()
      setTimeouts()
      setInitialTimeout(false)
    }

    return () => {
      //clearTimeouts();
    }
  }, [initialTimeout, setTimeouts, clearTimeouts])

  useEffect(() => {
    let isSubscribed = true
    let auth = store.getState()?.auth
    let time = new Date().getTime() - auth?.token?.time

    if (callRenewToken && time > ACCOUNT_TIMEOUT.renewTime && time < ACCOUNT_TIMEOUT.signoutTime) {
      axios({
        method: 'POST',
        url: 'oauth/token/',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: auth?.token?.refresh_token
        })
      })
        .then(data => {
          if (isSubscribed) {
            dispatch(setToken(data?.data))
            setCallRenewToken(false)
          }
        })
        .catch(() => {
          clearConsole()
        })
    } else if (time < ACCOUNT_TIMEOUT.renewTime || time > ACCOUNT_TIMEOUT.signoutTime) {
      setCallRenewToken(false)
    }
    return () => {
      isSubscribed = false
    }
  }, [callRenewToken, dispatch, store])

  return isAuthenticated ? (
    <div>
      {callRenewToken === false && <Comp {...props} />}
      <SessionNearExpirePopup
        show={showPopupSessionNearExpiration}
        handleClose={setShowPopupSessionNearExpiration}
        clearTimeouts={clearTimeouts}
        resetTimeout={resetTimeout}
      />
      <SessionExpirePopup
        show={showPopupSessionExpire}
        handleClose={setShowPopupSessionExpire}
        clearTimeouts={clearTimeouts}
      />
    </div>
  ) : (
    <Redirect to="/dashboard/auth" noThrow />
  )
}

export default PrivateRoute
