import styled from '@emotion/styled'
import React, { FunctionComponent, memo } from 'react'
import Button from '../../../components/atoms/Button'
import Popup, { Size } from '../../../components/molecules/Popup'
import './style.scss'

const ModalHeader = styled.h3`
  font-weight: 500;
  font-style: normal;
  font-size: 16px;
  letter-spacing: 0.39px;
  color: #14171a;
  text-align: left;
  line-height: 16px;
  padding-bottom: 1.5rem;
`

const ModalContentText = styled.div`
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.28px;
  color: #000000;
  text-align: left;
  line-height: 24px;
  padding-bottom: 1.5rem;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;

  .btn {
    width: 110px;
    height: 40px;
    font-size: 16px;
    padding: 0.4rem 1.375rem !important;

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

interface customClasses {
  container?: string
  header?: string
  content?: string
  footer?: string
}

interface Props {
  children?: React.ReactNode
  classNames?: customClasses
  contentText?: string | JSX.Element
  disabledConfirm?: boolean
  showPopup: boolean
  size?: Size
  title: string
  handleClose: () => void
  handleConfirm: () => void
}

const ConfirmModalTemplate: FunctionComponent<Props> = props => {
  const {
    classNames,
    contentText,
    disabledConfirm = false,
    showPopup,
    size = 'md',
    title,
    handleClose,
    handleConfirm,
    children
  } = props

  return (
    <React.Fragment>
      <Popup
        modalClass={'confirm-modal ' + classNames?.container}
        size={size}
        showPopup={showPopup}
        onShowPopupChange={handleClose}
      >
        <ModalHeader className={classNames?.header}>{title}</ModalHeader>
        <ModalContentText className={classNames?.content}>{contentText}</ModalContentText>
        {children}
        <ModalFooter className={classNames?.footer}>
          <Button className="btn cancelbtn" onClick={handleClose} secondary>
            Cancel
          </Button>
          <Button className="btn actionbtn" disabled={disabledConfirm} onClick={handleConfirm}>
            {'Confirm'}
          </Button>
        </ModalFooter>
      </Popup>
    </React.Fragment>
  )
}

export default memo(ConfirmModalTemplate)
