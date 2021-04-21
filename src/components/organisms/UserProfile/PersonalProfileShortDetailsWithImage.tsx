import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import RoundAvatar from '../../atoms/RoundAvatar'
import 'rsuite/dist/styles/rsuite-default.css'

export interface Props {
  userImage?: string
  userName: string
  companyName: string
  designation: string
  onProfilePhotoClicked: () => void
}

const Name = styled.div`
  font-size: 1.5rem;
  color: #2d3136;
  letter-spacing: 0.9px;
  line-height: 3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Designation = styled.div`
  font-size: 1.125rem;
  color: #2d3136;
  letter-spacing: 0.45px;
`

const CompanyName = styled.div`
  font-size: 1.125rem;
  color: #2d3136;
  letter-spacing: 0.45px;
`

const PersonalProfileShortDetailsWithImageContainer = styled.div`
  width: 90%;
  padding-bottom: 4.188rem;
  @media only screen and (max-width: 990px) {
    width: 80%;
  }
`
const UserNameDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 11.875rem);
`
const Row = styled.div`
  display: flex;
`
const PersonalProfileShortDetailsWithImage: FunctionComponent<Props> = props => {
  const {
    userImage,
    userName,
    companyName,
    designation,
    onProfilePhotoClicked
  } = props
  return (
    <PersonalProfileShortDetailsWithImageContainer>
      <Row>
        <RoundAvatar
          image={userImage}
          alt="user profile display picture"
          onClick={onProfilePhotoClicked}
        />
        <UserNameDetails>
          <Name>{userName}</Name>
          <Designation>{designation}</Designation>
          <CompanyName>{companyName}</CompanyName>
        </UserNameDetails>
      </Row>
    </PersonalProfileShortDetailsWithImageContainer>
  )
}
export default PersonalProfileShortDetailsWithImage
