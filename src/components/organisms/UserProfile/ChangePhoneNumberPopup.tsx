/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FunctionComponent } from 'react'
import Button from '../../../components/atoms/Button'
import styled from '@emotion/styled'
import Popup from '../../molecules/Popup'
import './style.scss'

const PopupTitle = styled.h3``

const PopupContentText = styled.div`
  padding-bottom: 2rem;
`

const PopupFooter = styled.div`
  display: flex;
`

interface Props {
  show: boolean
  handleClose: () => void
}

const ChangePhoneNumberPopup: FunctionComponent<Props> = props => {
  const { show, handleClose } = props

  return (
    <Popup modalClass="change-phone-number-popup" size="md" showPopup={show} onShowPopupChange={handleClose}>
      <PopupTitle className="popup-title">Change Phone Number</PopupTitle>
      <PopupContentText className="popup-content">
        {`Enter the new mobile number you would like to associate with your account. We’ll send a One Time Password (OTP) to that number.`}
      </PopupContentText>
      <PopupFooter className="popup-footer">
        <Button className="btn cancelbtn" onClick={() => handleClose()} secondary>
          Cancel
        </Button>
        <Button className="btn actionbtn" onClick={() => {}}>
          {'Confirm'}
        </Button>
      </PopupFooter>
    </Popup>
  )
}

export default ChangePhoneNumberPopup
