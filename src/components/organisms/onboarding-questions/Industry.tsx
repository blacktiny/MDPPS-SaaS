import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Input as RInput } from 'rsuite'
import Select from '../../atoms/SearchableSelect'
import { ValidationOptions, FieldErrors, FieldValues } from 'react-hook-form'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray } from '../../../utils/data'
import axios from 'utils/http/client'

const IndustrySelectWrapper = styled.div`
  margin-bottom: 1.75rem;
`

const HiddenValidateInput = styled(RInput)`
  display: none;
`

interface Props {
  defaultValue: string
  placeHolder: string
  errors: FieldErrors<FieldValues>
  error: AxiosError
  onChange: (name: string, val: string, shouldValidate?: boolean) => void
  required: boolean
  register?: (validationOptions?: ValidationOptions) => React.Ref<Element>
}
const Industry: FunctionComponent<Props> = props => {
  const { errors, onChange, register, defaultValue, error, required, placeHolder } = props

  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(defaultValue)

  useEffect(() => {
    axios({
      url: 'industry/',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        const { status, data } = response
        if (status === 200) {
          if (data && data.length > 0) {
            const mappedData = data.map(item => {
              return {
                text: item.title,
                value: item.url,
                key: item.url
              }
            })
            setOptions(mappedData)
          }
        }
      })
      .catch(error => {
        console.log('[API GET /category] error = ', error)
      })
  }, [])

  const updateIndustry = useCallback(
    (name, value, shouldValidate) => {
      setSelected(value)
      if (onChange) onChange(name, value, shouldValidate)
    },
    [onChange]
  )

  const isInvalid = !selected && errors?.industry?.type === 'required'

  return (
    <IndustrySelectWrapper>
      <Select
        defaultValue={defaultValue}
        options={options}
        label="Industry"
        placeholder={placeHolder}
        name="industry"
        searchable={true}
        errormsg={isInvalid ? 'Please enter your industry type' : ''}
        onChange={updateIndustry}
        invalid={isInvalid}
        required={required}
      />
      {extractErrorMsgFromArray(error, 'industry')}
      {required && register && (
        <HiddenValidateInput name={'industry'} value={defaultValue} inputRef={register({ required: true })} />
      )}
    </IndustrySelectWrapper>
  )
}
export default Industry
