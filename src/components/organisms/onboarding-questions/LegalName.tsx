import React, { Dispatch, ReactElement } from 'react'
import Input from '../../atoms/Input'
import { RouteComponentProps } from '@reach/router'
import { ValidationOptions, FieldErrors, FieldValues } from 'react-hook-form'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray } from 'utils/data'

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
    legalName: boolean
  }
  label?: string
  placeHolder?: string
  onChange?: (value: string) => void
  required?: boolean
}

const LegalName: React.FC<Props> = ({
  error,
  errors,
  register,
  name,
  value,
  showErrors,
  onChange,
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
        value={value}
        placeholder={placeHolder}
        label={isRequired(label, required)}
        invalid={errors?.legalName}
        errormsg={
          errors?.legalName?.type === 'required' ? 'Please enter your legal business name' : errors?.legalName?.msg
        }
        ref={register({ required: true })}
        onChange={value => {
          if (onChange) onChange(value)
          setShowErrors({ ...showErrors, TextInputField: false })
        }}
        showErrorWrapper={!showErrors.legalName}
      />
      {extractErrorMsgFromArray(error, 'business_name')}
    </>
  )
}

export default LegalName
