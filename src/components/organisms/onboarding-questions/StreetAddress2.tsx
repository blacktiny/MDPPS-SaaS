import React, { Dispatch } from 'react'
import Input from '../../atoms/Input'
import { extractErrorMsgFromArray, extractErroraddressMessage } from '../../../utils/data'
import { RouteComponentProps } from '@reach/router'
import { ValidationOptions, FieldErrors, FieldValues } from 'react-hook-form'
import { AxiosError } from 'axios'

interface Props extends RouteComponentProps {
  errors: FieldErrors<FieldValues>
  register: (validationOptions?: ValidationOptions) => React.Ref<Element>
  error: AxiosError
  defaultValue?: string
  isCustomer?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  label?: string
  placeholder?: string
  showErrors: {
    address?: boolean
    city?: boolean
    postalCode?: boolean
    website?: boolean
    address2: boolean
    state?: boolean
    email?: boolean
    phone?: boolean
  }
}

const StreetAddress2: React.FC<Props> = ({
  register,
  error,
  defaultValue,
  placeholder,
  isCustomer,
  setShowErrors,
  showErrors,
  label
}) => {
  const apiError = isCustomer
    ? showErrors.address2 && extractErrorMsgFromArray(error, 'address2')
    : showErrors.address2 && extractErroraddressMessage(error, 'address2')
  return (
    <>
      <Input
        name="address2"
        id="address2"
        placeholder={placeholder || 'Continue street address(optional)'}
        label={label || 'Street Address 2/Locality'}
        ref={register({})}
        defaultValue={defaultValue}
        onChange={() => {
          setShowErrors({ ...showErrors, address2: false })
        }}
        showErrorWrapper={!apiError || (apiError && !showErrors.address2)}
      />
      {apiError}
    </>
  )
}

export default StreetAddress2
