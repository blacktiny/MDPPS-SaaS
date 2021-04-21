import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Input as RInput } from 'rsuite'
import { FieldErrors, FieldValues, ValidationOptions } from 'react-hook-form'
import { AxiosError } from 'axios'
import MultiSelect from '../../atoms/MultiSelect/MultiSelect'
import { extractErrorMsgFromArray } from '../../../utils/data'
import axios from '../../../utils/http/client'

const HiddenValidateInput = styled(RInput)`
  display: none;
`

interface Props {
  defaultValue?: string[]
  placeHolder: string
  errors: FieldErrors<FieldValues>
  error: AxiosError
  onChange?: (selected: string[]) => void
  register?: (validationOptions?: ValidationOptions) => React.Ref<Element>
  required: boolean
}
const Industry: FunctionComponent<Props> = props => {
  const { errors, onChange, register, defaultValue, error, required, placeHolder } = props

  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(defaultValue)

  useEffect(() => {
    setSelected(JSON.parse(JSON.stringify(defaultValue)))
  }, [defaultValue])

  useEffect(() => {
    axios({
      url: 'category/',
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
                key: item.title
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

  const updateCategories = useCallback(
    newSelected => {
      setSelected(newSelected)
      if (onChange) onChange(newSelected)
    },
    [onChange]
  )

  const isInvalid = !selected.length && errors?.categories?.type === 'required'

  return (
    <React.Fragment>
      <MultiSelect
        defaultValue={defaultValue}
        options={options}
        label="Categories"
        placeholder={placeHolder}
        name="categories"
        errormsg={isInvalid ? 'Please choose at least one business category' : ''}
        onChange={updateCategories}
        invalid={isInvalid}
        required={required}
      />
      {extractErrorMsgFromArray(error, 'categories')}
      {required && register && (
        <HiddenValidateInput name={'categories'} value={selected.join()} inputRef={register({ required: true })} />
      )}
    </React.Fragment>
  )
}
export default Industry
