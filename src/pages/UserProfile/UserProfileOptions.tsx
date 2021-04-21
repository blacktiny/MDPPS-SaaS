import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import UserProfileOption from './UserProfileOption'
import Card from '../../components/atoms/Card'
import { SettingsMenu } from 'constants/menuConfig'

interface Props {
  options: SettingsMenu[]
  onOptionChange: (selectedKey: string | number) => void
  selectedOption: string | number
}

const UserProfileOptionsContainer = styled.ul`
  list-style: none;
  padding: 0.563rem 0;
  margin: 0;
  padding: 0;
  border-radius: 0;
`
const ProfileCardLeft = styled.div`
  background-color: #fff;
  box-shadow: 0px 1px 10px #00000012;
  border-radius: 0.25rem;
  overflow: hidden;
`
const UserProfileOptionContainer = styled.li``

const UserProfileOptions: FunctionComponent<Props> = props => {
  const { options, onOptionChange, selectedOption } = props
  const handelOnOptionClick = (selected: string) => {
    onOptionChange(selected)
  }

  return (
    <Card customClass="cardtabs">
      <ProfileCardLeft>
        <UserProfileOptionsContainer>
          {options.map(option => (
            <UserProfileOptionContainer key={option.id} onClick={() => handelOnOptionClick(option.id)}>
              <UserProfileOption isSelected={selectedOption === option.id} name={option.name} icon={option.icon} />
            </UserProfileOptionContainer>
          ))}
        </UserProfileOptionsContainer>
      </ProfileCardLeft>
    </Card>
  )
}
export default UserProfileOptions
