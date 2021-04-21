import React from 'react'
import styled from '@emotion/styled'
import security from '../../../assets/images/security.svg'
import Popup from '../../molecules/Popup'
import Button from '../../atoms/Button'
import { useDispatch } from 'react-redux'
import { resetUserData, resetToken } from '../../../store/auth'
import { resetLocation } from '../../../store/options'
import './style.scss'
import { navigate } from '@reach/router'
import { LOGIN } from '../../../constants/pagesPath'

interface Props {
  show: boolean
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

const ImageWrapper = styled.div`
  width: 100%;
  padding: 2.5rem;
`

const Image = styled.img`
  width: 100%;
`

const ContainerText = styled.p`
  font-weight: 400;
  color: black;
`

const SessionExpirePopup: React.FC<Props> = ({
  show,
  handleClose,
  clearTimeouts
}) => {
  const dispatch = useDispatch()

  const handleLogBackIn = () => {
    clearTimeouts()
    dispatch(resetUserData())
    dispatch(resetToken())
    dispatch(resetLocation())
    navigate(LOGIN)
  }

  return (
    <Popup
      modalClass="session-expire-logout-modal"
      showPopup={show}
      onShowPopupChange={handleClose}
      backdrop={'static'}
      size="sm"
      footer={
        <div>
          <Button small={true} onClick={handleLogBackIn}>
            Log back in
          </Button>
        </div>
      }
      header={<Title>Session Expired</Title>}
    >
      <Container>
        <ImageWrapper>
          <Image src={security} alt="Security" />
        </ImageWrapper>
        {'  '}
        <ContainerText>
          To safeguard your security, this session has expired and all work in
          progress has been auto saved. To continue working, please log back in.
        </ContainerText>
      </Container>
    </Popup>
  )
}
export default SessionExpirePopup
