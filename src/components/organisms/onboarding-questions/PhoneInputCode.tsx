import React, { ReactNode, Dispatch } from 'react'
import { RouteComponentProps } from '@reach/router'
import PhoneInput from '../../atoms/PhoneInput'
import { FieldErrors, FieldValues } from 'react-hook-form'

type FormData = {
  phone_number: string
}

interface Props extends RouteComponentProps {
  errors: FieldErrors<FieldValues>
  errorExtractedMsg?: ReactNode
  defaultValue?: string
  setPhoneNumber?: (data: string) => void
  setPhoneError?: (data: boolean) => void
  phoneError: boolean
  phoneValue: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  showErrors: {
    address?: boolean
    city?: boolean
    postalCode?: boolean
    website?: boolean
    address2?: boolean
    state?: boolean
    email?: boolean
    phone?: boolean
    jobTitle?: boolean
  }
}

const PhoneInputCode: React.FC<Props> = ({
  errors,
  errorExtractedMsg,
  setPhoneNumber,
  setPhoneError,
  phoneError,
  phoneValue,
  showErrors,
  setShowErrors
}) => {
  return (
    <>
      <PhoneInput
        name="phone_number"
        label="Phone"
        key="input-phone"
        phoneValue={phoneValue}
        setPhoneNumber={setPhoneNumber}
        setPhoneError={setPhoneError}
        placeholder="Enter phone number"
        invalid={phoneError}
        onChange={() => {
          setShowErrors({ ...showErrors, phone: false })
        }}
        errormsg={errors?.phone_number?.type === 'required' && 'Please enter your phone number'}
        showErrorWrapper={!errorExtractedMsg || (errorExtractedMsg && !showErrors.phone)}
      />
      {showErrors?.phone && errorExtractedMsg}
    </>
  )
}

export default PhoneInputCode
