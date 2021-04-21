import React, { FunctionComponent } from 'react'
import ModalBody from '../atoms/ModalBody'
import ModalHeader from '../atoms/ModalHeader'
import ModalFooter from '../atoms/ModalFooter'
import CloseIcon from '../atoms/CloseIcon'
import ModalLayout from '../atoms/ModalLayout'

export type Size = 'lg' | 'md' | 'sm' | 'xs'

interface Popup {
  handelOnClose?: () => void
  showPopup: boolean
  onShowPopupChange: (showPopup: boolean) => void
  size?: Size
  PopupClass?: string
  modalClass?: string
  backdrop?: boolean | 'static'
  bodyModalClassPrefix?: string
  footer?: JSX.Element
  header?: JSX.Element
}

const Popup: FunctionComponent<Popup> = props => {
  const {
    showPopup,
    handelOnClose,
    onShowPopupChange,
    size,
    PopupClass,
    modalClass,
    bodyModalClassPrefix,
    backdrop
  } = props

  const handelOnPopUpClose = () => {
    if (handelOnClose) {
      handelOnClose()
    }
    onShowPopupChange(false)
  }

  return (
    <ModalLayout
      customModalWrapperClass={PopupClass}
      customModalClass={modalClass}
      size={size}
      show={showPopup}
      backdrop={backdrop}
      handelOnHide={handelOnPopUpClose}
    >
      <ModalHeader>{props.header ? props.header : <CloseIcon handleClose={handelOnPopUpClose} />}</ModalHeader>
      <ModalBody classPrefix={bodyModalClassPrefix}>{props.children}</ModalBody>
      <ModalFooter>{props.footer}</ModalFooter>
    </ModalLayout>
  )
}

export default Popup
