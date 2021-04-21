import React, { Dispatch } from 'react'
import PhoneInput from '../../atoms/PhoneInput'
import { ErrorMsg } from '../../../utils/style'
import styled from '@emotion/styled'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray } from '../../../utils/data'

const PhoneNumberInput = styled.div`
  .country-list {
    z-index: 7;
  }
`

interface Props {
  name: string
  label: string
  placeholder: string
  setPhoneNumber?: (data: string) => void
  setPhoneError?: (data: boolean) => void
  phoneError: boolean
  phoneValue?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  showErrors: Object
  disabled?: boolean
  testId?: string
  errorMessageName?: string
  apiError?: AxiosError
  apiErrorKey?: string
  triggerRequiredValidation?: boolean
  showApiError?: boolean
}

const PhoneNumberWithCodeInput: React.FC<Props> = ({
  setPhoneNumber,
  setPhoneError,
  phoneError,
  phoneValue,
  showErrors,
  setShowErrors,
  disabled = false,
  name,
  label,
  placeholder,
  testId,
  errorMessageName,
  apiError,
  apiErrorKey,
  triggerRequiredValidation,
  showApiError
}) => {
  const apiErrorData =
    apiError?.response?.data?.errors &&
    apiError?.response?.data?.errors?.[name] &&
    apiError?.response?.data?.errors?.[name].length > 0
      ? true
      : false
  return (
    <>
      <PhoneNumberInput>
        <PhoneInput
          triggerRequiredValidation={triggerRequiredValidation}
          errorMessageName={errorMessageName}
          testId={testId}
          disabled={disabled}
          name={name}
          label={label}
          key={name}
          phoneValue={phoneValue || ''}
          setPhoneNumber={setPhoneNumber}
          setPhoneError={setPhoneError}
          placeholder={placeholder}
          invalid={phoneError}
          hideValidationError={showApiError && apiErrorData}
          onChange={() => {
            setShowErrors({ ...showErrors, [name]: false })
          }}
        />
        <ErrorMsg>
          {showApiError && extractErrorMsgFromArray(apiError, apiErrorKey)}
        </ErrorMsg>
      </PhoneNumberInput>
    </>
  )
}

export default PhoneNumberWithCodeInput
