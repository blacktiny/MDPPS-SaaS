import React, { Dispatch } from 'react'
import Input from '../../atoms/Input'
import { RouteComponentProps } from '@reach/router'
import { ValidationOptions, FieldErrors, FieldValues } from 'react-hook-form'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray, extractErroraddressMessage } from '../../../utils/data'

interface Props extends RouteComponentProps {
  errors: FieldErrors<FieldValues>
  register: (validationOptions?: ValidationOptions) => React.Ref<Element>
  error: AxiosError
  isCustomer?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  placeholder?: string
  required?: boolean
  showErrors: {
    address: boolean
    city?: boolean
    postalCode?: boolean
    website?: boolean
    address2?: boolean
    state?: boolean
    email?: boolean
    phone?: boolean
  }
}

const StreetAddress: React.FC<Props> = ({
  errors,
  register,
  error,
  isCustomer,
  setShowErrors,
  showErrors,
  placeholder,
  required
}) => {
  const apiError = isCustomer
    ? showErrors.address && extractErrorMsgFromArray(error, 'address1')
    : showErrors.address && extractErroraddressMessage(error, 'address1')
  return (
    <>
      <Input
        name="address1"
        id="address1"
        placeholder={placeholder || 'Enter a street address'}
        label="Street Address"
        invalid={errors?.address1 ? true : false}
        errormsg={errors?.address1?.type === 'required' && 'Please enter your address'}
        ref={register({ required: true })}
        onChange={() => {
          setShowErrors({ ...showErrors, address: false })
        }}
        showErrorWrapper={!apiError || (apiError && !showErrors.address)}
        required={required}
      />
      {apiError}
    </>
  )
}

export default StreetAddress
