import React, { FunctionComponent } from 'react'
import { Modal } from 'rsuite'

const ModalHead: FunctionComponent = props => {
  return <Modal.Header closeButton={false}>{props.children}</Modal.Header>
}

export default ModalHead
