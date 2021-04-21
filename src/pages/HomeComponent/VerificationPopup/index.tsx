import React from 'react'
import styled from '@emotion/styled'
import frozenAcc from '../../../assets/images/frozen-icon.svg'
import Button from '../../../components/atoms/Button'
import Popup from '../../../components/molecules/Popup'
import './style.scss'
interface Props {
  show: boolean
  handleClose: (show: boolean) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center !important;
  img {
    width: calc(28em - 2vw);
  }
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
  text-align: left;
  font-size: 1.125rem;
  letter-spacing: 0.36px;
  padding-bottom: 1.688rem;
  border-bottom: 1px solid #70707036;
  width: 100%;
  span {
    font-family: roboto-bold;
    color: #657786;
  }
`

const FrozenContent = styled.div`
  text-align: center;
  width: 100%;
  p {
    color: #3469c7;
    font-size: 1.5rem;
    padding: 1.688rem 0 2.438rem;
  }
  button {
    background-color: #4284fc;
    border-radius: 4px;
    color: #f3f3f4;
    box-shadow: 0px 3px 6px #00000029;
    letter-spacing: 0.49px;
    font-size: 1rem;
    width: 10.875rem;
    height: 3.063rem;
  }
`

const VerificationPopup: React.FC<Props> = ({ show, handleClose }) => {
  return (
    <Popup
      modalClass="account-dialog"
      size="lg"
      showPopup={show}
      onShowPopupChange={handleClose}
    >
      <Container>
        <img src={frozenAcc} alt="frozenAndLockedAccount" />
        <DialogTitle>You’re back already!</DialogTitle>
        <DialogContent>
          We take our verification process serious to insure only approved brand
          owners, distributors, and dealers have access to our online
          marketplace.{' '}
          <span>
            Our team is working hard to verify your account and will notify you
            via email!
          </span>
        </DialogContent>
        <FrozenContent>
          <p>While you wait, enjoy browsing our business directory</p>
          <Button>Browse Now</Button>
        </FrozenContent>
      </Container>
    </Popup>
  )
}
export default VerificationPopup
