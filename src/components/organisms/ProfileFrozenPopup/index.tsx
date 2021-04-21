import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import frozenAndLockedAccount from '../../../assets/images/frozenAndLockedAccount.svg'
import Popup from '../../molecules/Popup'
import './style.scss'
interface Props {
  show: boolean
  handleClose: (show: boolean) => void
  content: ReactNode
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center !important;
`

const DialogTitle = styled.h1`
  font-size: 2.125rem;
  letter-spacing: 0.24px;
  color: #3469c7;
  padding-top: 2.969rem;
  padding-bottom: 1.5rem;
  font-weight: normal;
`
const DialogContent = styled.div`
  color: #657786;
  text-align: center;
  font-size: 1.125rem;
  width: 100%;
`

const ResponsiveDialog: React.FC<Props> = ({ show, handleClose, content }) => {
  return (
    <Popup
      modalClass="frozen-popup"
      size="md"
      showPopup={show}
      onShowPopupChange={handleClose}
    >
      <Container>
        <img src={frozenAndLockedAccount} alt="frozenAndLockedAccount" />
        <DialogTitle>You account and profile is frozen</DialogTitle>
        <DialogContent>{content}</DialogContent>
      </Container>
    </Popup>
  )
}
export default ResponsiveDialog
