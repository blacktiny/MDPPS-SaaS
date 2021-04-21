import React, { Dispatch } from 'react'
import Input from '../../atoms/Input'
import { RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import { ValidationOptions, FieldErrors, FieldValues } from 'react-hook-form'
import { AxiosError } from 'axios'
import TaxId from '../../molecules/Onboarding/TaxId'

interface Props extends RouteComponentProps {
  errors: FieldErrors<FieldValues>
  register: (validationOptions?: ValidationOptions) => React.Ref<Element>
  error: AxiosError
  name: string
  index?: number
  value?: {
    taxType?: string
    taxId?: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  showErrors: {
    taxId: boolean
  }
  onChangeType?: (data: string) => void
  onChangeId?: (data: string) => void
  placeHolder?: string
  required?: boolean
}
const TaxIdWrapper = styled.div`
  display: flex;
  align-items: baseline;
  & > div:first-of-type {
    min-width: 110px;
    width: 115px;
    min-height: 50px;
    input {
      margin-top: -6px;
      height: 50px;
    }
  }
  & > div:last-of-type {
    flex: 1;
    margin-left: 30px;
  }
`
const TaxIdInput: React.FC<Props> = ({
  errors,
  register,
  name,
  value,
  showErrors,
  onChangeType,
  onChangeId,
  setShowErrors,
  placeHolder = '',
  required
}) => {
  return (
    <TaxIdWrapper>
      <TaxId
        defaultValue={value.taxType}
        errors={errors}
        error={errors?.taxId?.msg}
        onChange={(_name, value) => onChangeType(value)}
        required={required}
      />
      <Input
        name={name}
        id={name}
        placeholder={placeHolder}
        label={''}
        value={value.taxId}
        invalid={errors?.taxId}
        errormsg={errors?.taxId?.type === 'required' ? 'Please enter your tax ID number' : errors?.taxId?.msg}
        ref={register({ required: true })}
        onChange={value => {
          onChangeId(value)
          setShowErrors({ ...showErrors, TextInputField: false })
        }}
        showErrorWrapper={!showErrors.taxId}
      />
    </TaxIdWrapper>
  )
}

export default TaxIdInput
