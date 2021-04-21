import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import warning from '../../../assets/images/warning.svg'
import Popup from '../../molecules/Popup'
import Button from '../../atoms/Button'
import axios from '../../../utils/http/client'
import './style.scss'
import { useStore, useDispatch } from 'react-redux'
import {
  AuthState,
  resetUserData,
  resetToken,
  setToken
} from '../../../store/auth'
import { navigate } from '@reach/router'
import { LOGIN } from '../../../constants/pagesPath'
import { ACCOUNT_TIMEOUT } from '../../../constants/common'
import { resetLocation } from '../../../store/options'
import qs from 'querystring'

interface Props {
  show: boolean
  resetTimeout: () => void
  handleClose?: (show: boolean) => void
  clearTimeouts?: () => void
}

const Title = styled.h1`
  font-weight: 500;
  font-style: normal;
  font-size: 1rem;
  letter-spacing: 0.39px;
  color: #14171a;
  text-align: left;
  line-height: 16px;
  font-family: Roboto;
  padding-bottom: 1.5rem;
`

const Container = styled.div`
  display: inline;
`

const WarningImage = styled.img`
  font-weight: 400;
  color: black;
  display: inline-block;
  vertical-align: text-top;
  width: 1.1rem;
`

const ContainerText = styled.p`
  font-weight: 400;
  color: black;
  display: inline-block;
  width: calc(100% - 2.2rem);
  padding-left: 1.1rem;
  vertical-align: text-top;
`

const SessionModalFooter = styled.div`
  padding: 0 -0.625rem;
  .logout-btn {
    margin-right: 1.35rem;
  }
`

const SessionNearExpirePopup: React.FC<Props> = ({
  show,
  handleClose,
  resetTimeout,
  clearTimeouts
}) => {
  const dispatch = useDispatch()
  const [second, setSecond] = useState(
    (ACCOUNT_TIMEOUT.signoutTime - ACCOUNT_TIMEOUT.warningTime) / 1000
  )

  const store = useStore()

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setSecond(second - 1)
      }, 1000)
    } else {
      setSecond(
        (ACCOUNT_TIMEOUT.signoutTime - ACCOUNT_TIMEOUT.warningTime) / 1000
      )
    }
  }, [second, show])

  const auth: AuthState = store.getState()?.auth
  const token = auth?.token?.access_token

  const handleLogout = () => {
    clearTimeouts()
    dispatch(resetUserData())
    dispatch(resetToken())
    dispatch(resetLocation())

    axios({
      method: 'POST',
      url: 'oauth/revoke_token/',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        token: token,
        selflogout: '1'
      })
    }).then(() => {
      navigate(LOGIN)
    })
  }

  const handleContinueSession = () => {
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
    }).then(data => {
      dispatch(setToken(data?.data))
      resetTimeout()
      handleClose(false)
    })
  }

  return (
    <Popup
      modalClass="session-expire-modal"
      showPopup={show}
      onShowPopupChange={handleClose}
      backdrop={'static'}
      size="sm"
      footer={
        <SessionModalFooter>
          <Button
            secondary={true}
            small={true}
            onClick={handleLogout}
            className="logout-btn"
          >
            Log Out
          </Button>
          <Button small={true} onClick={handleContinueSession}>
            Continue Session
          </Button>
        </SessionModalFooter>
      }
      header={<Title>Session Timeout</Title>}
    >
      <Container>
        <WarningImage src={warning} alt="Warning" />
        {'  '}
        <ContainerText>
          Your session is about to expire due to inactivity. You will be
          automatically signed out in <b>{second} seconds</b>. To keep working
          select Continue Session.
        </ContainerText>
      </Container>
    </Popup>
  )
}
export default SessionNearExpirePopup
