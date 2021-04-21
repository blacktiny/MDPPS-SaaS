import React, { Dispatch } from 'react'
import Input from '../../atoms/Input'
import { RouteComponentProps } from '@reach/router'
import { ValidationOptions, Ref, FieldErrors, FieldValues } from 'react-hook-form'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray, extractErroraddressMessage } from '../../../utils/data'

interface Props extends RouteComponentProps {
  errors: FieldErrors<FieldValues>
  register: (validationOptions?: ValidationOptions) => React.Ref<Element>
  error: AxiosError
  defaultValue?: string
  isCustomer: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  placeholder?: string
  showErrors: {
    address?: boolean
    city: boolean
    postalCode?: boolean
    website?: boolean
    address2?: boolean
    state?: boolean
    email?: boolean
    phone?: boolean
  }
  required?: boolean
}

const City: React.FC<Props> = ({
  errors,
  register,
  error,
  defaultValue,
  placeholder,
  isCustomer,
  setShowErrors,
  showErrors,
  required
}) => {
  const apiError = isCustomer
    ? showErrors.city && extractErrorMsgFromArray(error, 'city')
    : showErrors.city && extractErroraddressMessage(error, 'city')
  return (
    <>
      <Input
        name="city"
        id="city"
        placeholder={placeholder || 'Enter a city'}
        label="City"
        invalid={errors?.city ? true : false}
        errormsg={errors?.city?.type === 'required' && 'Please select your city'}
        ref={register({ required: true })}
        defaultValue={defaultValue}
        onChange={() => {
          setShowErrors({ ...showErrors, city: false })
        }}
        showErrorWrapper={!apiError || (apiError && !showErrors.city)}
        required={required}
      />
      {apiError}
    </>
  )
}

export default City
