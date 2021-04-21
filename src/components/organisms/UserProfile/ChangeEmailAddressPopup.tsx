/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FunctionComponent } from 'react'
import Button from '../../../components/atoms/Button'
import styled from '@emotion/styled'
import Popup from '../../molecules/Popup'
import './style.scss'

const PopupTitle = styled.h3``

const PopupContentText = styled.div``

const PopupFooter = styled.div`
  display: flex;
`

interface Props {
  show: boolean
  handleClose: () => void
}

const ChangeEmailAddressPopup: FunctionComponent<Props> = props => {
  const { show, handleClose } = props

  return (
    <Popup modalClass="change-email-address-popup" size="md" showPopup={show} onShowPopupChange={handleClose}>
      <PopupTitle className="popup-title">Change Email Address</PopupTitle>
      <PopupContentText className="popup-content">
        {`Enter the new email address you would like to associate with your account. We’ll send a One Time Password (OTP) to that address.
        We recommend using your company email address for verification and security.`}
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

export default ChangeEmailAddressPopup
