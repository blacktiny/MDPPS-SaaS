import React, { useCallback, useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Input as RInput } from 'rsuite'
import { FieldErrors, FieldValues, ValidationOptions } from 'react-hook-form'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray, extractErroraddressMessage } from '../../../utils/data'
import Select from '../../atoms/SearchableSelect'
import styled from '@emotion/styled'
import axios from 'utils/http/client'

const HiddenValidateInput = styled(RInput)`
  display: none;
`

interface Props extends RouteComponentProps {
  errors: FieldErrors<FieldValues>
  error: AxiosError
  defaultValue?: string
  isCustomer?: boolean
  countryId?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (name: string, val: string, shouldValidate?: boolean) => void
  register?: (validationOptions?: ValidationOptions) => React.Ref<Element>
  showErrorWrapper?: boolean
  showErrors: {
    address?: boolean
    city?: boolean
    postalCode?: boolean
    website?: boolean
    address2?: boolean
    state: boolean
    email?: boolean
    phone?: boolean
  }
  required?: boolean
}

const SelectWrapper = styled.div`
  .location-dropdown .default.text {
    left: 1.125rem !important;
  }
`

const SelectState: React.FC<Props> = ({
  errors,
  showErrorWrapper,
  onChange,
  register,
  countryId,
  error,
  defaultValue,
  isCustomer,
  showErrors,
  required
}) => {
  const mockData = [
    { text: 'CO', value: 'CO', key: 'CO' },
    { text: 'MO', value: 'MO', key: 'MO' },
    { text: 'NY', value: 'NY', key: 'NY' }
  ]

  const [options, setOptions] = useState([])

  const apiError = isCustomer
    ? showErrors.state && extractErrorMsgFromArray(error, 'state')
    : showErrors.state && extractErroraddressMessage(error, 'state')

  const [selected, setSelected] = useState(defaultValue)

  useEffect(() => {
    setSelected(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (countryId) {
      axios({
        url: `regions?country=${countryId}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          const { status, data } = response
          if (status === 200 && data && data.length > 0) {
            const mappedData = data.map(item => {
              return {
                text: !isNaN(item.geoname_code) ? item.name : item.geoname_code,
                value: !isNaN(item.geoname_code) ? item.name : item.geoname_code,
                key: item.id
              }
            })
            setOptions(mappedData)
          }
        })
        .catch(error => {
          console.log('[API GET /attribute/] error = ', error)
        })
    }
  }, [countryId])

  const updateState = useCallback(
    (name, value, shouldValidate) => {
      setSelected(value)
      if (onChange) onChange(name, value, shouldValidate)
    },
    [onChange]
  )

  const isInvalid = !selected && errors?.state?.type === 'required'

  return (
    <SelectWrapper>
      <Select
        options={options && options.length > 0 ? options : mockData}
        label="State / Province / Region"
        placeholder="State / Region"
        name="state"
        searchable={true}
        showErrorWrapper={showErrorWrapper}
        invalid={isInvalid}
        errormsg={isInvalid ? 'Please select your state, province, or region' : ''}
        defaultValue={defaultValue}
        onChange={updateState}
        required={required}
      />
      {apiError}
      {required && register && (
        <HiddenValidateInput name={'state'} value={selected} inputRef={register({ required: true })} />
      )}
    </SelectWrapper>
  )
}

export default SelectState
