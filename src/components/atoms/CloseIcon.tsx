import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import close from '../../assets/images/close-popup.svg'

const CloseIconComponent = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  position: absolute;
  right: 0;
  cursor: pointer;
  top: 15px;
  right: 15px;
  z-index: 1;
  cursor: pointer;
`
interface CloseIconProps {
  handleClose: () => void
}

const CloseIcon: FunctionComponent<CloseIconProps> = props => {
  const { handleClose } = props
  return <CloseIconComponent src={close} onClick={handleClose} alt="closeIcon" />
}

export default CloseIcon
