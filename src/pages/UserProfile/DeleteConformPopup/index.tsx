import React, { FunctionComponent, useCallback } from 'react'
import Button from '../../../components/atoms/Button'
import Popup from '../../../components/molecules/Popup'
import variables from '../../../assets/styles/variables'
import styled from '@emotion/styled'

import './style.scss'

const { Fonts } = variables

interface Props {
  show: boolean
  handleClose: (show: boolean) => void
  handleSubmit: () => void
}

const ModalHeader = styled.h3`
  font-weight: ${Fonts.Weight.Medium};
  font-style: normal;
  font-size: 16px;
  letter-spacing: 0.39px;
  color: #14171a;
  text-align: left;
  line-height: 16px;
  padding-bottom: 1.5rem;
`

const ModalContent = styled.p`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.28px;
  color: #000000;
  text-align: left;
  line-height: 24px;
  padding-bottom: 1rem;
`

const ModalFooter = styled.div`
  text-align: right;
  display: flex;
  justify-content: flex-end;

  .btn {
    width: 110px;
    height: 40px;
    font-size: 16px;
    padding: 0.4rem 1.375rem;

    &.actionbtn {
      margin-left: 2rem;
    }
  }

  @media (max-width: 768px) {
    .btn {
      font-size: 14px;
    }
  }
`

const DeleteConformPopup: FunctionComponent<Props> = props => {
  const { show, handleClose, handleSubmit } = props

  const handelOnSubmit = useCallback(() => {
    handleSubmit()
  }, [handleSubmit])

  return (
    <Popup modalClass="deleteconformation-popup" size="sm" showPopup={show} onShowPopupChange={handleClose}>
      <ModalHeader>Delete Photo</ModalHeader>
      <ModalContent>Are you sure you want to delete your photo? This cannot be undone.</ModalContent>
      <ModalFooter>
        <Button className="btn cancelbtn" onClick={() => handleClose(false)} secondary>
          Cancel
        </Button>
        <Button className="btn actionbtn" onClick={handelOnSubmit}>
          {'Confirm'}
        </Button>
      </ModalFooter>
    </Popup>
  )
}
export default DeleteConformPopup
