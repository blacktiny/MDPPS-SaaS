import React, { FunctionComponent, useEffect } from 'react'
import Select from '../atoms/SearchableSelect'
import { FieldErrors, FieldValues } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import useAxios from 'axios-hooks'
import { RootState } from '../../store/types'
import { convertJsonForSearchableSelectWithoutUrl } from '../../utils/ConvertJsonForSelect'
import {
  setTimezone,
  Timezone as TimezoneType
} from '../../store/options/timezone'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray } from '../../utils/data'

interface Props {
  error: AxiosError
  errors: FieldErrors<FieldValues>
  onChange: (name: string, val: string, shouldValidate?: boolean) => void
  defaultValue: string
}

const Timezone: FunctionComponent<Props> = props => {
  const dispatch = useDispatch()

  const timezoneOptions = useSelector<RootState>(
    ({ options }) => options?.timezone
  ) as TimezoneType[]

  const [{ data: choicesData }, exec] = useAxios(
    {
      url: 'users/me/choices/',
      method: 'GET'
    },
    { manual: true }
  )

  useEffect(() => {
    if (!timezoneOptions?.length) {
      exec()
    }
  }, [timezoneOptions, exec])

  useEffect(() => {
    if (choicesData?.timezones) {
      dispatch(
        setTimezone(
          convertJsonForSearchableSelectWithoutUrl(choicesData.timezones)
        )
      )
    }
  }, [choicesData, dispatch])

  const { errors, onChange, defaultValue, error } = props
  return (
    <React.Fragment>
      <Select
        defaultValue={defaultValue}
        options={timezoneOptions}
        label="Time Zone"
        placeholder="Select a Time zone"
        name="timezone"
        searchable={true}
        invalid={errors?.country ? true : false}
        errormsg={
          errors?.timezone?.type === 'required' &&
          'Please select your Time zone'
        }
        onChange={onChange}
      />
      {extractErrorMsgFromArray(error, 'timezone')}
    </React.Fragment>
  )
}
export default Timezone
