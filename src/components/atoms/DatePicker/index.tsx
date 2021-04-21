import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react'
import { DatePicker } from 'rsuite'
import { DatePickerWrapper, DatePickerLabel, HiddenValidateInput } from './style'
import { FieldErrors, FieldValues, ValidationOptions } from 'react-hook-form'
import { ErrorMsg } from 'utils/style'

interface Props {
  errors?: FieldErrors<FieldValues>
  label?: string
  name?: string
  defaultValue?: string
  register?: (validationOptions?: ValidationOptions) => React.Ref<Element>
  required?: boolean
}

const DatePicker2: FunctionComponent<Props> = props => {
  const { errors, defaultValue, label, name, required = false, register } = props

  const [date, setDate] = useState(null)

  useEffect(() => {
    if (defaultValue) {
      const dateArray = defaultValue.split('-')
      setDate(new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2])))
    }
  }, [defaultValue])

  const handleSelect = useCallback(selectedDate => {
    setDate(selectedDate)
  }, [])

  const invalid = useMemo(() => {
    return !date && errors[name]
  }, [date, errors, name])

  return (
    <DatePickerWrapper className={invalid ? 'invalid' : ''}>
      {label && (
        <DatePickerLabel>
          {label}
          <span style={{ color: 'red' }}>{required ? ' *' : ''}</span>
        </DatePickerLabel>
      )}
      <DatePicker onSelect={handleSelect} value={date} />
      {invalid && (
        <div className="error-wrapper">
          <ErrorMsg className="my-0">{'Please enter your date of birth'}</ErrorMsg>
        </div>
      )}
      {register && (
        <HiddenValidateInput
          name={name}
          value={date ? date.toString() : ''}
          inputRef={register({ required: required })}
        />
      )}
    </DatePickerWrapper>
  )
}

export default DatePicker2
