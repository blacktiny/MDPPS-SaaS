import React, { FunctionComponent } from 'react'
import RadioButton, { Props as RadioFButtonProps } from '../atoms/RadioButton'
import { RadioGroup } from 'rsuite'
import { Controller, Control } from 'react-hook-form'

export interface Props {
  optionName: string
  optionValues: RadioFButtonProps[]
  displayInLine?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<Record<string, any>>
}

const AllOptions = (options: RadioFButtonProps[]) => {
  return options.map((option, key) => (
    <RadioButton key={key} value={option.value} label={option.label} />
  ))
}

const MultipleChoiceOptions: FunctionComponent<Props> = props => {
  const { optionName, optionValues, displayInLine = true, control } = props

  return (
    <Controller
      as={
        <RadioGroup inline={displayInLine}>
          {AllOptions(optionValues)}
        </RadioGroup>
      }
      name={optionName}
      control={control}
    />
  )
}
export default MultipleChoiceOptions
