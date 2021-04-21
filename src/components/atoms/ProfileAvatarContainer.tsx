import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const ProfileAvatarContainerComponent = styled.div``

interface Props {
  customClass?: string
}

const ProfileAvatarContainer: FunctionComponent<Props> = props => {
  const { customClass } = props
  return (
    <ProfileAvatarContainerComponent className={customClass}>
      {props.children}
    </ProfileAvatarContainerComponent>
  )
}
export default ProfileAvatarContainer
