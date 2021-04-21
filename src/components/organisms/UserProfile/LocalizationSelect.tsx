import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Input as RInput } from 'rsuite'
import Select from '../../atoms/SearchableSelect'
import { FieldErrors, FieldValues, ValidationOptions } from 'react-hook-form'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray } from 'utils/data'

const LocalizationSelectWrapper = styled.div`
  margin-bottom: 1.75rem;
`

const HiddenValidateInput = styled(RInput)`
  display: none;
`

interface Props {
  label?: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[]
  defaultValue?: string
  placeholder?: string
  errors: FieldErrors<FieldValues>
  apiError?: AxiosError
  onChange?: (name: string, val: string, shouldValidate?: boolean) => void
  register?: (validationOptions?: ValidationOptions) => React.Ref<Element>
}

const LocalizationSelect: FunctionComponent<Props> = props => {
  const { errors, label, name, options, onChange, register, defaultValue, apiError, placeholder } = props

  const [selected, setSelected] = useState(defaultValue)

  useEffect(() => {
    setSelected(defaultValue)
  }, [defaultValue])

  const updateEntityType = useCallback(
    (name, value, shouldValidate) => {
      setSelected(value)
      if (onChange) onChange(name, value, shouldValidate)
    },
    [onChange]
  )

  const isInvalid = !selected && errors[name] && errors[name]?.type === 'required'

  return (
    <LocalizationSelectWrapper>
      <Select
        defaultValue={selected}
        options={options}
        label={label}
        placeholder={placeholder}
        name={name}
        errormsg={isInvalid ? 'Please specify your entity type' : ''}
        onChange={updateEntityType}
        invalid={isInvalid}
      />
      {extractErrorMsgFromArray(apiError, name)}
      {register && <HiddenValidateInput name={name} value={selected} inputRef={register({ required: true })} />}
    </LocalizationSelectWrapper>
  )
}

export default LocalizationSelect
