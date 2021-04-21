import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Input as RInput } from 'rsuite'
import MultiSelect from '../../atoms/MultiSelect/MultiSelect'
import { FieldErrors, FieldValues, ValidationOptions } from 'react-hook-form'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray } from '../../../utils/data'
import axios from '../../../utils/http/client'

const HiddenValidateInput = styled(RInput)`
  display: none;
`

interface Props {
  value?: string[]
  defaultValue?: string[]
  placeHolder: string
  errors: FieldErrors<FieldValues>
  error: AxiosError
  onChange?: (selected: string[]) => void
  register?: (validationOptions?: ValidationOptions) => React.Ref<Element>
  required: boolean
}
const Attributes: FunctionComponent<Props> = props => {
  const { value = [], errors, onChange, register, defaultValue, error, required, placeHolder } = props

  const [options, setOptions] = useState([])
  const [selectedAttributes, setSelectedAttributes] = useState(value)

  useEffect(() => {
    setSelectedAttributes(JSON.parse(JSON.stringify(defaultValue)))
  }, [defaultValue])

  useEffect(() => {
    axios({
      url: 'attribute/',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        const { status, data } = response
        if (status === 200 && data && data.length > 0) {
          const mappedData = data.map(item => {
            return {
              text: item.title,
              value: item.url,
              key: item.title
            }
          })
          setOptions(mappedData)
        }
      })
      .catch(error => {
        console.log('[API GET /attribute/] error = ', error)
      })
  }, [])

  const handleChangeAttributes = useCallback(
    newAttributes => {
      setSelectedAttributes(newAttributes)
      if (onChange) onChange(newAttributes)
    },
    [onChange]
  )

  const addNewData = useCallback(
    newVal => {
      axios({
        url: 'attribute/',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          title: newVal
        })
      })
        .then(response => {
          const { status, data } = response
          if (status === 201 && data && data.url) {
            const newOptions = JSON.parse(JSON.stringify(options))
            newOptions.push({ text: data.title, value: data.url, key: data.title })
            setOptions(newOptions)

            selectedAttributes.push(data.url)
            setSelectedAttributes(JSON.parse(JSON.stringify(selectedAttributes)))
            if (onChange) onChange(JSON.parse(JSON.stringify(selectedAttributes)))
          }
        })
        .catch(error => {
          console.log('[API POST /attribute/] error = ', error)
        })
    },
    [onChange, options, selectedAttributes]
  )

  const isInvalid = !selectedAttributes.length && errors?.attributes?.type === 'required'

  return (
    <React.Fragment>
      <MultiSelect
        value={selectedAttributes}
        defaultValue={defaultValue}
        options={options}
        label="Attributes"
        placeholder={placeHolder}
        name="attributes"
        errormsg={isInvalid ? 'Please choose at least one attribute' : ''}
        onChange={handleChangeAttributes}
        addNewOption={addNewData}
        invalid={isInvalid}
        required={required}
        creatable
      />
      {extractErrorMsgFromArray(error, 'attributes')}
      {required && register && (
        <HiddenValidateInput
          name={'attributes'}
          value={selectedAttributes.join()}
          inputRef={register({ required: true })}
        />
      )}
    </React.Fragment>
  )
}
export default Attributes
