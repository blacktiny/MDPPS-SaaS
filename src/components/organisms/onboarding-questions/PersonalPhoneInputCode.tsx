import React, { ReactNode, Dispatch, useMemo } from 'react'
import { RouteComponentProps } from '@reach/router'
import PhoneInput from '../../atoms/PhoneInput'
import { ValidationOptions, FieldErrors, FieldValues } from 'react-hook-form'

type FormData = {
  PhoneNumber: string
}

interface Props extends RouteComponentProps {
  errors: FieldErrors<FieldValues>
  register?: (validationOptions?: ValidationOptions) => React.Ref<Element>
  errorExtractedMsg?: ReactNode
  defaultValue?: string
  setPhoneNumber?: (data: string) => void
  setPhoneError?: (data: boolean) => void
  phoneError?: boolean
  phoneValue: string
  phoneVerified?: boolean
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  setShowChangeModal?: () => void
  showErrors: {
    PhoneNumber?: boolean
    mobile_phone_number?: boolean
  }
  required?: boolean
  name: string
}

const MobileInputCode: React.FC<Props> = ({
  errors,
  name,
  register,
  errorExtractedMsg = null,
  setPhoneNumber,
  setPhoneError,
  phoneError,
  phoneValue,
  phoneVerified,
  showErrors,
  setShowErrors,
  setShowChangeModal,
  required = false,
  label
}) => {
  const invalid = useMemo(() => {
    return (
      (errors && errors[name]?.type === 'required' && !phoneValue) ||
      phoneError ||
      (showErrors[name] && errorExtractedMsg !== null)
    )
  }, [errorExtractedMsg, errors, name, phoneError, phoneValue, showErrors])
  return (
    <>
      <PhoneInput
        name={name}
        label={label || 'Mobile number'}
        key={name}
        phoneValue={phoneValue}
        verified={phoneVerified}
        setPhoneNumber={setPhoneNumber}
        setPhoneError={setPhoneError}
        setShowChangeModal={setShowChangeModal}
        placeholder="Enter phone number"
        invalid={invalid}
        onChange={() => {
          setShowErrors({ ...showErrors, [name]: false })
        }}
        errormsg={invalid && 'Please enter your phone number'}
        showErrorWrapper={invalid}
        required={required}
        register={register}
      />
      {showErrors[name] && errorExtractedMsg}
    </>
  )
}

export default MobileInputCode
