import React, { FunctionComponent } from 'react'
import { Modal } from 'rsuite'

type Size = 'lg' | 'md' | 'sm' | 'xs'

interface ModalLayoutProps {
  show: boolean
  size?: Size
  customModalWrapperClass?: string
  customModalClass?: string
  backdrop?: boolean | 'static'
  handelOnHide: () => void
}

const ModalLayout: FunctionComponent<ModalLayoutProps> = props => {
  const { show, customModalWrapperClass, size, customModalClass, backdrop, handelOnHide } = props
  return (
    <div className={customModalWrapperClass || ''}>
      <Modal
        backdrop={backdrop || true}
        className={customModalClass || ''}
        size={size || 'md'}
        show={show}
        onHide={handelOnHide}
      >
        {props.children}
      </Modal>
    </div>
  )
}

export default ModalLayout
