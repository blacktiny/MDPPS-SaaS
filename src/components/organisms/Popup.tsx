import React, { FunctionComponent } from 'react'
import PopupLayout from '../molecules/PopupLayout'

type Size = 'lg' | 'md' | 'sm' | 'xs'

interface Popup {
  handelOnClose?: () => void
  showPopup: boolean
  onShowPopupChange: (showPopup: boolean) => void
  size?: Size
  PopupClass?: string
  modalClass?: string
}

const Popup: FunctionComponent<Popup> = props => {
  const {
    showPopup,
    handelOnClose,
    onShowPopupChange,
    size,
    PopupClass,
    modalClass
  } = props

  const handelOnPopUpClose = () => {
    if (handelOnClose) {
      handelOnClose()
    }
    onShowPopupChange(false)
  }

  return (
    <PopupLayout
      size={size}
      modalWrapperClass={PopupClass}
      modalClass={modalClass}
      show={showPopup}
      handleClose={handelOnPopUpClose}
    >
      {props.children}
    </PopupLayout>
  )
}

export default Popup
