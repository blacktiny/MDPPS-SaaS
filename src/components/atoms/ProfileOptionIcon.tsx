import React, { FunctionComponent, ReactElement } from 'react'
import styled from '@emotion/styled'

interface Props {
  icon: ReactElement
}

const ProfileOptionIconComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 20px;
    height: 20px;

    path {
      fill: rgb(182, 208, 253);
    }
  }
`

const ProfileOptionIcon: FunctionComponent<Props> = props => {
  const { icon } = props
  return <ProfileOptionIconComponent>{icon}</ProfileOptionIconComponent>
}

export default ProfileOptionIcon
