import React, { FunctionComponent } from 'react'
import { Radio, RadioProps } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'

export interface Props extends RadioProps {
  value: string | number
  label: string
}

const RadioButton: FunctionComponent<Props> = props => {
  const { value, label, ...otherProps } = props
  return (
    <Radio value={value} {...otherProps}>
      {label}
      {props.children}
    </Radio>
  )
}
export default RadioButton
