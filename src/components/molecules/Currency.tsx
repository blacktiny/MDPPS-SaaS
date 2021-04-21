import React, { FunctionComponent, useEffect } from 'react'
import Select from '../atoms/SearchableSelect'
import { FieldErrors, FieldValues } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import useAxios from 'axios-hooks'
import { RootState } from '../../store/types'
import { convertJsonForSearchableSelectWithoutUrl } from '../../utils/ConvertJsonForSelect'
import { setCurrency, Currency as CurrencyType } from '../../store/options/currency'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray } from '../../utils/data'

interface Props {
  defaultValue: string
  errors: FieldErrors<FieldValues>
  error: AxiosError
  onChange: (name: string, val: string, shouldValidate?: boolean) => void
}

const Currency: FunctionComponent<Props> = props => {
  const dispatch = useDispatch()

  const currencyOptions = useSelector<RootState>(({ options }) => options?.currency) as CurrencyType[]

  const [{ data: choicesData }, exec] = useAxios(
    {
      url: 'users/me/choices/',
      method: 'GET'
    },
    { manual: true }
  )

  useEffect(() => {
    if (!currencyOptions?.length) {
      exec()
    }
  }, [currencyOptions, exec])

  useEffect(() => {
    if (choicesData?.currency) {
      dispatch(setCurrency(convertJsonForSearchableSelectWithoutUrl(choicesData.currency)))
    }
  }, [choicesData, dispatch])
  const { errors, onChange, defaultValue, error } = props
  return (
    <React.Fragment>
      <Select
        defaultValue={defaultValue}
        options={currencyOptions}
        label="Currency"
        placeholder="Select Currency"
        name="currency"
        searchable={true}
        errormsg={errors?.currency?.type === 'required' && 'Please select your Currency'}
        onChange={onChange}
      />
      {extractErrorMsgFromArray(error, 'currency')}
    </React.Fragment>
  )
}
export default Currency
