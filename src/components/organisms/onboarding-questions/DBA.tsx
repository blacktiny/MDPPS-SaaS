import React, { Dispatch, ReactElement } from 'react'
import Input from '../../atoms/Input'
import { RouteComponentProps } from '@reach/router'
import { ValidationOptions, FieldErrors, FieldValues } from 'react-hook-form'
import { AxiosError } from 'axios'

interface Props extends RouteComponentProps {
  errors: FieldErrors<FieldValues>
  register: (validationOptions?: ValidationOptions) => React.Ref<Element>
  error: AxiosError
  name: string
  index?: number
  value?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  showErrors: {
    dba: boolean
  }
  label?: string
  onChange?: (value: string) => void
  placeHolder?: string
  required?: boolean
}

const DBA: React.FC<Props> = ({
  errors,
  register,
  name,
  value,
  showErrors,
  onChange,
  setShowErrors,
  placeHolder = '',
  label = '',
  required
}) => {
  const isRequired = (msg: string, required: Boolean): ReactElement => (
    <span>
      {msg}
      <span style={{ color: 'red' }}>{required ? ' *' : ''}</span>
    </span>
  )
  return (
    <>
      {required && (
        <Input
          name={name}
          id={name}
          placeholder={placeHolder}
          label={isRequired(label, required)}
          value={value}
          invalid={errors?.dba}
          errormsg={errors?.dba?.type === 'required' ? 'Please enter your DBA' : errors?.dba?.msg}
          ref={register({ required: true })}
          onChange={value => {
            if (onChange) onChange(value)
            setShowErrors({ ...showErrors, TextInputField: false })
          }}
          showErrorWrapper={!showErrors.dba}
        />
      )}
    </>
  )
}

export default DBA
