import React from 'react'
import { FormLabelHeader, ControlLabel, HelpBlock, RequiredStar } from './style'

type FormLabelProps = {
  helpLabel?: React.ReactNode
  htmlFor?: string
  requiredLabel?: boolean
  invalid?: boolean
  children: React.ReactNode
}

const FormLabel = ({ helpLabel, htmlFor, requiredLabel, invalid, children }: FormLabelProps) => (
  <FormLabelHeader>
    <ControlLabel htmlFor={htmlFor} invalid={invalid}>
      {children}
      {requiredLabel && <RequiredStar>*</RequiredStar>}
    </ControlLabel>

    {helpLabel && <HelpBlock>{helpLabel}</HelpBlock>}
  </FormLabelHeader>
)

export default FormLabel
