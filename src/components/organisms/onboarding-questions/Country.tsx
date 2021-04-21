import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import { Input as RInput } from 'rsuite'
import { FieldErrors, FieldValues, ValidationOptions } from 'react-hook-form'
import useAxios from 'axios-hooks'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray } from '../../../utils/data'
import { RootState } from '../../../store/types'
import { convertJsonForSearchableSelect } from '../../../utils/ConvertJsonForSelect'
import { setCountry, Country as CountryType } from '../../../store/options/country'
import Select from '../../atoms/SearchableSelect'

const HiddenValidateInput = styled(RInput)`
  display: none;
`

type FormData = {
  country: string
}

interface Props extends RouteComponentProps {
  error: AxiosError
  defaultValue?: string
  errors?: FieldErrors<FieldValues>
  onChange: (name: string, val: string, shouldValidate?: boolean) => void
  register?: (validationOptions?: ValidationOptions) => React.Ref<Element>
  showErrorWrapper?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  countryError?: any
  required?: boolean
}

const Country: React.FC<Props> = ({ defaultValue, required, error, errors, onChange, register, showErrorWrapper }) => {
  const dispatch = useDispatch()

  const countryOptions = useSelector<RootState>(({ options }) => options?.country) as CountryType[]

  const [{ data: choicesData }, exec] = useAxios(
    {
      url: 'countrys',
      method: 'GET'
    },
    { manual: true }
  )

  useEffect(() => {
    if (!countryOptions?.length) {
      exec()
    }
  }, [countryOptions, exec])

  useEffect(() => {
    if (choicesData) {
      dispatch(setCountry(convertJsonForSearchableSelect(choicesData)))
    }
  }, [choicesData, dispatch])

  const [selected, setSelected] = useState(defaultValue)

  useEffect(() => {
    if (defaultValue) setSelected(defaultValue)
  }, [defaultValue])

  const updateCountry = useCallback(
    (name, value, shouldValidate) => {
      setSelected(value)
      if (onChange) onChange(name, value, shouldValidate)
    },
    [onChange]
  )

  const isInvalid = !selected && errors?.country?.type === 'required'

  return (
    <>
      <Select
        options={countryOptions}
        label="Country"
        placeholder="Select Country"
        name="country"
        searchable={true}
        showErrorWrapper={showErrorWrapper}
        invalid={isInvalid}
        errormsg={isInvalid && 'Please select your country'}
        defaultValue={defaultValue}
        onChange={updateCountry}
        required={required}
      />
      {extractErrorMsgFromArray(error, 'country')}
      {required && register && (
        <HiddenValidateInput name={'country'} value={selected} inputRef={register({ required: true })} />
      )}
    </>
  )
}

export default Country
