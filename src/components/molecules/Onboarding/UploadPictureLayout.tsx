import React, { FunctionComponent } from 'react'
import CloseIcon from '../../atoms/CloseIcon'
import ModalHeader from '../../atoms/ModalHeader'
import styled from '@emotion/styled'
type Size = 'lg' | 'md' | 'sm' | 'xs'

interface ModalLayoutProps {
  show: boolean
  size?: Size
  customModalWrapperClass?: string
  customModalClass?: string
  backdrop?: boolean | 'static'
  handleOnHide: () => void
}
const UploadModal = styled.div`
  position: fixed;
  background: #ffffff;
  overflow: hidden !important;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  z-index: 1000;
  display: ${props =>
    // @ts-ignore
    props?.show ? '' : 'none'};
  .rs-modal-header {
    img {
      height: 40px;
      width: 20px;
      margin-right: 10px;
    }
  }
`
const ModalLayout: FunctionComponent<ModalLayoutProps> = props => {
  const { show, handleOnHide } = props
  return (
    <UploadModal
      // @ts-ignore
      show={show}
    >
      <ModalHeader>
        <CloseIcon handleClose={handleOnHide} />
      </ModalHeader>
      {props.children}
    </UploadModal>
  )
}

export default ModalLayout
