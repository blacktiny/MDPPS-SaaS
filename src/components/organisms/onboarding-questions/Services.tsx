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
const Services: FunctionComponent<Props> = props => {
  const { value = [], errors, onChange, register, defaultValue, error, required, placeHolder } = props

  const [options, setOptions] = useState([])
  const [selectedServices, setSelectedServices] = useState(value)

  useEffect(() => {
    setSelectedServices(JSON.parse(JSON.stringify(defaultValue)))
  }, [defaultValue])

  useEffect(() => {
    axios({
      url: 'service/',
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
        console.log('[API GET /service/] error = ', error)
      })
  }, [])

  const handleChangeServices = useCallback(
    newServices => {
      setSelectedServices(newServices)
      if (onChange) onChange(newServices)
    },
    [onChange]
  )

  const addNewData = useCallback(
    newVal => {
      axios({
        url: 'service/',
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

            selectedServices.push(data.url)
            setSelectedServices(JSON.parse(JSON.stringify(selectedServices)))
            if (onChange) onChange(JSON.parse(JSON.stringify(selectedServices)))
          }
        })
        .catch(error => {
          console.log('[API POST /service/] error = ', error)
        })
    },
    [onChange, options, selectedServices]
  )

  const isInvalid = !selectedServices.length && errors?.services?.type === 'required'

  return (
    <React.Fragment>
      <MultiSelect
        value={selectedServices}
        defaultValue={defaultValue}
        options={options}
        label="Services"
        placeholder={placeHolder}
        name="services"
        errormsg={isInvalid ? 'Please choose at least one service' : ''}
        onChange={handleChangeServices}
        addNewOption={addNewData}
        invalid={isInvalid}
        required={required}
        creatable
      />
      {extractErrorMsgFromArray(error, 'services')}
      {required && register && (
        <HiddenValidateInput
          name={'services'}
          value={selectedServices.join()}
          inputRef={register({ required: true })}
        />
      )}
    </React.Fragment>
  )
}
export default Services
