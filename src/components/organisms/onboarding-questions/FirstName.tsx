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
  defaultValue?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  showErrors: {
    FirstName: boolean
    LastName: boolean
    PhoneNumber: boolean
  }
  label?: string
  placeHolder?: string
  required?: boolean
}

const FirstName: React.FC<Props> = ({
  errors,
  register,
  name,
  defaultValue,
  showErrors,
  setShowErrors,
  placeHolder = '',
  label = '',
  required = false
}) => {
  const isRequired = (msg: string, required: Boolean): ReactElement => (
    <span>
      {msg}
      <span style={{ color: 'red' }}>{required ? ' *' : ''}</span>
    </span>
  )
  return (
    <>
      <Input
        name={name}
        id={name}
        placeholder={placeHolder}
        label={isRequired(label, required)}
        defaultValue={defaultValue}
        invalid={errors?.FirstName}
        errormsg={errors?.FirstName?.type === 'required' ? 'Please enter your first name' : errors?.FirstName?.msg}
        ref={register({ required: true })}
        onChange={() => {
          setShowErrors({ ...showErrors, TextInputField: false })
        }}
        showErrorWrapper={!showErrors.LastName}
      />
    </>
  )
}

export default FirstName
