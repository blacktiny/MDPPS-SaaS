import React, { Dispatch } from 'react'
import Input from '../../atoms/Input'
import { ValidationOptions, FieldErrors, FieldValues } from 'react-hook-form'
import { RouteComponentProps } from '@reach/router'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray } from '../../../utils/data'
type FormData = {
  email: string
}

interface Props extends RouteComponentProps {
  errors: FieldErrors<FieldValues>
  register: (validationOptions?: ValidationOptions) => React.Ref<Element>
  error?: AxiosError
  label: string
  placeholder: string
  defaultValue?: string
  disabled?: boolean
  disableLabel?: boolean
  setReadOnlyStyle?: boolean
  verified?: boolean
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
  }
  onChangeEmail?: () => void
}

const Email: React.FC<Props> = ({
  errors,
  register,
  error,
  label,
  placeholder,
  defaultValue,
  setShowErrors,
  showErrors,
  disabled = false,
  disableLabel,
  onChangeEmail,
  setReadOnlyStyle,
  verified
}) => {
  const apiError = extractErrorMsgFromArray(error, 'email')
  return (
    <div className="email-container">
      {verified && (
        <div className="change-button email" onClick={onChangeEmail}>
          Change
        </div>
      )}
      <Input
        setReadOnlyStyle={setReadOnlyStyle}
        disableLabel={disableLabel}
        disabled={disabled}
        name="email"
        id="email"
        label={label}
        placeholder={placeholder}
        ref={register({
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          required: true
        })}
        defaultValue={defaultValue}
        invalid={errors?.email ? true : false}
        errormsg={
          (errors?.email?.type === 'required' && 'Please enter your email address') ||
          (errors?.email?.type === 'pattern' && 'Please enter a valid email address')
        }
        onChange={() => {
          setShowErrors({ ...showErrors, email: false })
        }}
        showErrorWrapper={!apiError || (apiError && !showErrors.email)}
      />
      {verified && (
        <div className="verified-mark email">
          <span className="icon-nav-check" />
        </div>
      )}
      {showErrors?.email && apiError}
    </div>
  )
}

export default Email
