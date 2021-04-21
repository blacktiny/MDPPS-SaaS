import React, { FunctionComponent } from 'react'
import { Modal } from 'rsuite'

interface ModalLayoutProps {
  classPrefix?: string
}

const ModalBody: FunctionComponent<ModalLayoutProps> = props => {
  return (
    <Modal.Body classPrefix={props.classPrefix}>{props.children}</Modal.Body>
  )
}

export default ModalBody
