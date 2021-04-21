import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ProfileOptions, {
  Props as OptionProps
} from '../../components/organisms/ProfileOption'
import Card from '../../components/atoms/Card'

interface Option extends OptionProps {
  key: number
  testId: string
}

interface Props {
  options: Option[]
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
  const handelOnOptionClick = (selectedKey: number) => {
    onOptionChange(selectedKey)
  }

  const alteredSelectedOption = selectedOption

  return (
    <Card customClass="col-md-2 cardtabs">
      <ProfileCardLeft>
        <UserProfileOptionsContainer>
          {options.map(option => (
            <UserProfileOptionContainer
              key={option.key}
              data-testid={option.testId}
              onClick={() => handelOnOptionClick(option.key)}
            >
              <ProfileOptions
                optionIconClassName={option.optionIconClassName}
                isSelected={alteredSelectedOption === option.key}
                optionHeader={option.optionHeader}
              />
            </UserProfileOptionContainer>
          ))}
        </UserProfileOptionsContainer>
      </ProfileCardLeft>
    </Card>
  )
}
export default UserProfileOptions
