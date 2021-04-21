import React, { FunctionComponent } from 'react'
import { Toggle } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'

export interface Props {
  onChange: (checked: boolean) => void
  checked: boolean
  size?: 'lg' | 'md' | 'sm'
  testId?: string
}

const ToggleButton: FunctionComponent<Props> = props => {
  const { onChange, checked, size, testId } = props

  const handelOnToggleChange = (checked: boolean) => {
    onChange(checked)
  }

  return (
    <Toggle
      data-testid={testId}
      checked={checked}
      onChange={handelOnToggleChange}
      size={size}
    />
  )
}
export default ToggleButton
