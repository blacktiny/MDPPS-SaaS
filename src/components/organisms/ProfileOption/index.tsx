import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import BoldTopic from '../../atoms/BoldTopic'
import ProfileAvatarContainer from '../../atoms/ProfileAvatarContainer'
import ProfileOptionIcon from '../../atoms/ProfileOptionIcon'
import classNames from 'classnames'
import './style.scss'

export interface Props {
  optionHeader: string
  optionIconClassName: string
}

interface ProfileOptionComponent extends Props {
  isSelected: boolean
}

const OptionContainer = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 0.875rem 1.688rem;
  width: 100%;
  position: relative;
  transition: 0.3s;
  overflow: hidden;
  .option-icon {
    transition: 0.3s;
    transition-delay: 0.2s;
  }
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

    .option-icon {
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
    padding: 0.875rem 0.938rem;
  }
`
const OptionContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
`

const ProfileOption: FunctionComponent<ProfileOptionComponent> = props => {
  const { optionHeader, isSelected, optionIconClassName } = props

  const optionContainerStyle = classNames({
    selectedoption: isSelected
  })

  return (
    <OptionContainer className={optionContainerStyle}>
      <ProfileAvatarContainer>
        <ProfileOptionIcon icon={<span className={optionIconClassName} />} />
      </ProfileAvatarContainer>
      <OptionContentContainer>
        <BoldTopic customClass="optionmenu">{optionHeader}</BoldTopic>
      </OptionContentContainer>
    </OptionContainer>
  )
}
export default ProfileOption
