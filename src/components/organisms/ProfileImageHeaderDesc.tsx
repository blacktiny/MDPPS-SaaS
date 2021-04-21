import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import RoundAvatar from '../atoms/RoundAvatar'

interface Props {
  image: string
  imgAltMsg?: string
  profileName: string
  onProfilePhotoClicked?: () => void
}

const UserProfileContainer = styled.div`
  display: flex;
`

const ProfileDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 2rem;
  z-index: 2;
`

const UserProfileName = styled.h2`
  font-weight: 400;
  font-style: normal;
  font-size: 1.5rem;
  letter-spacing: normal;
  color: #ffffff;
  text-align: left;
  line-height: 2rem;
  margin-top: 0.5rem;
`

const PreviewLink = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const PreviewText = styled.span`
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  letter-spacing: 0.3px;
  color: #4284fc;
  text-align: left;
  line-height: 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const ExternalLinkIcon = styled.span`
  color: #4284fc;
  font-size: 10px;
  margin-left: 0.5rem;
  text-decoration: none;
`

const ProfileImageHeaderDesc: FunctionComponent<Props> = props => {
  const { image, imgAltMsg = 'profile photo', profileName, onProfilePhotoClicked } = props
  return (
    <UserProfileContainer>
      <RoundAvatar image={image} alt={imgAltMsg} onClick={onProfilePhotoClicked} />
      <ProfileDescription>
        <UserProfileName>{profileName}</UserProfileName>
        <PreviewLink>
          <PreviewText>Preview profile</PreviewText>
          <ExternalLinkIcon className="icon-external-link" />
        </PreviewLink>
      </ProfileDescription>
    </UserProfileContainer>
  )
}
export default ProfileImageHeaderDesc
