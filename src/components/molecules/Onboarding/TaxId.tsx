import React, { FunctionComponent } from 'react'
import Select from '../../atoms/SearchableSelect'
import { FieldErrors, FieldValues } from 'react-hook-form'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray } from '../../../utils/data'

interface Props {
  defaultValue: string
  errors: FieldErrors<FieldValues>
  error: AxiosError
  onChange: (name: string, val: string, shouldValidate?: boolean) => void
  required: boolean
}
const TaxId: FunctionComponent<Props> = props => {
  const mockData = [
    { text: 'SSN', value: 'ssn', key: 'SSN' },
    { text: 'EIN', value: 'ein', key: 'EIN' },
    { text: 'TIN', value: 'tin', key: 'TIN' },
    { text: 'Other', value: 'other', key: 'Other' }
  ]
  const { errors, onChange, defaultValue, error, required } = props
  return (
    <React.Fragment>
      <Select
        defaultValue={defaultValue}
        options={mockData}
        label="Tax ID"
        placeholder=""
        name="taxId"
        searchable={true}
        errormsg={''}
        onChange={onChange}
        invalid={errors?.taxId}
        required={required}
      />
      {extractErrorMsgFromArray(error, 'taxId')}
    </React.Fragment>
  )
}
export default TaxId
