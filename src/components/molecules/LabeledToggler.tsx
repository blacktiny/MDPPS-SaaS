import React, { FunctionComponent } from 'react'
import FormFieldHeader from '../atoms/FormFieldHeader'
import ToggleButton, { Props as ToggleButtonProps } from '../atoms/ToggleButton'
import styled from '@emotion/styled'

const ToggleSwitchText = styled.span`
  color: #14171a;
  font-size: 0.875rem;
  &:first-of-type {
    margin-right: 1.25rem;
  }
  &:last-child {
    margin-left: 1.25rem;
  }
`

interface Props extends ToggleButtonProps {
  label: string
  name: string
  testId?: string
}

const LabeledToggler: FunctionComponent<Props> = props => {
  const { label, name, checked, onChange, testId } = props
  return (
    <React.Fragment>
      <FormFieldHeader name={name} label={label} />
      <ToggleSwitchText>Off</ToggleSwitchText>
      <ToggleButton
        size="md"
        checked={checked}
        onChange={onChange}
        testId={testId}
      />
      <ToggleSwitchText>On</ToggleSwitchText>
    </React.Fragment>
  )
}
export default LabeledToggler
