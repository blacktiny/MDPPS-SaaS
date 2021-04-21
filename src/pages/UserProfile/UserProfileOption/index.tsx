import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import BoldTopic from '../../../components/atoms/BoldTopic'
import classNames from 'classnames'
import './style.scss'

export interface Props {
  name: string
  icon: string
}

interface UserProfileOptionComponent extends Props {
  isSelected: boolean
}

const UserOptionContainer = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 0.9375rem 1.875rem;
  width: 100%;
  position: relative;
  transition: 0.3s;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    width: 0.25rem;
    background-color: #3be051;
    height: 100%;
    display: inline-block;
    left: -0.25rem;
    transition: 0.3s;
  }

  &:hover {
    background-color: #f9f9fa;
    transition: 0.3s;

    .settings-option-icon {
      color: #4284fc;
      transition: 0.3s;
    }
  }

  &.selectedoption {
    background-color: #f9f9fa;

    &:before {
      content: '';
      position: absolute;
      width: 0.25rem;
      background-color: #3be051;
      height: 100%;
      display: inline-block;
      left: 0;
      transition: 0.3s;
      transition-delay: 0.2s;
    }
  }

  @media only screen and (max-width: 1440px) {
    padding: 0.875rem 0.938rem 0.875rem 1.5rem;
  }

  @media only screen and (max-width: 768px) {
    padding: 0.875rem 0.938rem 0.875rem 1.2rem;
  }
`

const OptionContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;

  @media (max-width: 767px) {
    display: none;
  }
`

const ProfileAvatarContainer = styled.div`
  color: rgb(182, 208, 253);
  font-size: 1.25rem;
  line-height: 1.25rem;
`

const ProfileOptionIcon = styled.span``

const UserProfileOption: FunctionComponent<UserProfileOptionComponent> = props => {
  const { name, isSelected, icon } = props

  const optionContainerStyle = classNames({
    selectedoption: isSelected
  })

  return (
    <UserOptionContainer className={optionContainerStyle}>
      <ProfileAvatarContainer className="settings-option-icon">
        <ProfileOptionIcon className={icon} />
      </ProfileAvatarContainer>
      <OptionContentContainer>
        <BoldTopic customClass="optionmenu">{name}</BoldTopic>
      </OptionContentContainer>
    </UserOptionContainer>
  )
}
export default UserProfileOption
