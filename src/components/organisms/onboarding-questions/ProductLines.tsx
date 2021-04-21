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
  defaultValue: string[]
  placeHolder: string
  errors: FieldErrors<FieldValues>
  error: AxiosError
  onChange?: (selected: string[]) => void
  register?: (validationOptions?: ValidationOptions) => React.Ref<Element>
  required: boolean
}
const ProductLines: FunctionComponent<Props> = props => {
  const { value = [], errors, onChange, register, defaultValue, error, required, placeHolder } = props

  const [options, setOptions] = useState([])
  const [selectedProducts, setSelectedProducts] = useState(value)

  useEffect(() => {
    setSelectedProducts(JSON.parse(JSON.stringify(defaultValue)))
  }, [defaultValue])

  useEffect(() => {
    axios({
      url: 'productline',
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
        console.log('[API GET /productline] error = ', error)
      })
  }, [])

  const handleChangeProducts = useCallback(
    newProducts => {
      setSelectedProducts(newProducts)
      if (onChange) onChange(newProducts)
    },
    [onChange]
  )

  const addNewData = useCallback(
    newVal => {
      axios({
        url: 'productline/',
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

            selectedProducts.push(data.url)
            setSelectedProducts(JSON.parse(JSON.stringify(selectedProducts)))
            if (onChange) onChange(JSON.parse(JSON.stringify(selectedProducts)))
          }
        })
        .catch(error => {
          console.log('[API POST /service/] error = ', error)
        })
    },
    [onChange, options, selectedProducts]
  )

  const isInvalid = !selectedProducts.length && errors?.productLines?.type === 'required'

  return (
    <React.Fragment>
      <MultiSelect
        value={selectedProducts}
        defaultValue={defaultValue}
        options={options}
        label="Product Lines"
        placeholder={placeHolder}
        name="productLines"
        errormsg={isInvalid ? 'Please choose at least one product line' : ''}
        onChange={handleChangeProducts}
        addNewOption={addNewData}
        invalid={isInvalid}
        required={required}
        creatable
      />
      {extractErrorMsgFromArray(error, 'productLines')}
      {required && register && (
        <HiddenValidateInput
          name={'productLines'}
          value={selectedProducts.join()}
          inputRef={register({ required: true })}
        />
      )}
    </React.Fragment>
  )
}
export default ProductLines
