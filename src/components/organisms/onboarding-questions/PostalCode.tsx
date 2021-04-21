import React, { Dispatch } from 'react'
import Input from '../../atoms/Input'
import { RouteComponentProps } from '@reach/router'
import { ValidationOptions, FieldErrors, FieldValues } from 'react-hook-form'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray, extractErroraddressMessage } from '../../../utils/data'

type FormData = {
  zip_code: string
}

interface Props extends RouteComponentProps {
  errors: FieldErrors<FieldValues>
  register: (validationOptions?: ValidationOptions) => React.Ref<Element>
  error: AxiosError
  defaultValue?: string
  isCustomer?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  placeholder?: string
  showErrors: {
    address?: boolean
    city?: boolean
    postalCode: boolean
    website?: boolean
    address2?: boolean
    state?: boolean
    email?: boolean
    phone?: boolean
  }
  required?: boolean
  maxLength?: number
}

const PostalCode: React.FC<Props> = ({
  errors,
  error,
  register,
  defaultValue,
  isCustomer,
  setShowErrors,
  showErrors,
  placeholder,
  maxLength = 8,
  required
}) => {
  const apiError = isCustomer
    ? showErrors.postalCode && extractErrorMsgFromArray(error, 'zip_code')
    : showErrors.postalCode && extractErroraddressMessage(error, 'zip_code')

  return (
    <>
      <Input
        name="zip_code"
        id="zip_code"
        placeholder={placeholder || 'Enter a zip code'}
        label="Zip / Postal Code"
        invalid={errors?.zip_code ? true : false}
        errormsg={errors?.zip_code?.type === 'required' && 'Please enter your zip or postal code'}
        ref={register({ required: true, maxLength: maxLength })}
        defaultValue={defaultValue}
        onChange={() => {
          setShowErrors({ ...showErrors, postalCode: false })
        }}
        maxLength={maxLength}
        showErrorWrapper={!apiError || (apiError && !showErrors.postalCode)}
        required={required}
      />
      {apiError}
    </>
  )
}

export default PostalCode
