import React, { Dispatch, ReactElement } from 'react'
import Input from '../../../../../components/atoms/Input'
import { RouteComponentProps } from '@reach/router'
import { ValidationOptions, FieldErrors, FieldValues } from 'react-hook-form'
import { AxiosError } from 'axios'
import styled from '@emotion/styled'
import variables from '../../../../../assets/styles/variables'
const { Colors } = variables
interface FormData {
  [key: string]: boolean
}

interface Props extends RouteComponentProps {
  errors: FieldErrors<FieldValues>
  register: (validationOptions?: ValidationOptions) => React.Ref<Element>
  error: AxiosError
  name: string
  index?: number
  defaultValue?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  showErrors: FormData
  label?: string
  placeHolder?: string
  required?: boolean
  type?: string
  fieldName?: string
  hideLabel?: boolean
}

const Asterisk = styled.span`
  color: ${Colors.Red[3]};
`

const CustomInput: React.FC<Props> = ({
  index,
  errors,
  register,
  name,
  defaultValue,
  showErrors,
  setShowErrors,
  placeHolder = '',
  label = '',
  required = false,
  type = 'text',
  hideLabel = false,
  fieldName
}) => {
  const isRequired = (msg: string, required: Boolean): ReactElement => (
    <span>
      {msg}
      <Asterisk>{required ? ' *' : ''}</Asterisk>
    </span>
  )

  const errorMsg = () => {
    if (errors?.Employees) {
      if (errors?.Employees[index]?.[fieldName]?.type === 'required')
        return `Please enter the ${label && label.toLowerCase()}` + (fieldName === 'Email' ? ' address' : '')
      else if (errors?.Employees[index]?.[fieldName]?.type === 'pattern' && type === 'email')
        return 'Pleaes enter the valid email address'
    }
  }

  return (
    <Input
      name={name}
      id={name}
      placeholder={placeHolder}
      label={hideLabel ? null : isRequired(label, required)}
      defaultValue={defaultValue}
      invalid={errors?.Employees && errors?.Employees[index]?.[fieldName]}
      errormsg={errorMsg()}
      ref={register({
        required: true,
        pattern: type === 'email' ? /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ : /^/
      })}
      onChange={() => {
        setShowErrors({ ...showErrors, TextInputField: false })
      }}
      showErrorWrapper={true}
    />
  )
}

export default CustomInput
