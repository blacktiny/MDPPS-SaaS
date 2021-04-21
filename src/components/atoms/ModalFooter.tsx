import React, { FunctionComponent } from 'react'
import { Modal } from 'rsuite'

const ModalFooter: FunctionComponent = props => {
  return <Modal.Footer>{props.children}</Modal.Footer>
}

export default ModalFooter
