import React, { FunctionComponent } from 'react'
import ModalBody from '../atoms/ModalBody'
import ModalHeader from '../atoms/ModalHeader'
import CloseIcon from '../atoms/CloseIcon'
import ModalLayout from '../atoms/ModalLayout'

type Size = 'lg' | 'md' | 'sm' | 'xs'

interface PopupContentProps {
  handleClose: () => void
  show: boolean
  size?: Size
  modalWrapperClass?: string
  modalClass?: string
}

const PopupLayout: FunctionComponent<PopupContentProps> = props => {
  const { handleClose, show, size, modalWrapperClass, modalClass } = props
  return (
    <ModalLayout
      customModalWrapperClass={modalWrapperClass}
      customModalClass={modalClass}
      size={size}
      show={show}
      handelOnHide={handleClose}
    >
      <ModalHeader>
        <CloseIcon handleClose={handleClose} />
      </ModalHeader>
      <ModalBody>{props.children}</ModalBody>
    </ModalLayout>
  )
}

export default PopupLayout
