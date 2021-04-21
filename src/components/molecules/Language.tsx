import React, { FunctionComponent, useEffect, useContext } from 'react'
import Select from '../atoms/SearchableSelect'
import { FieldErrors, FieldValues } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import useAxios from 'axios-hooks'
import { RootState } from '../../store/types'
import { convertJsonForSearchableSelectWithoutUrl } from '../../utils/ConvertJsonForSelect'
import {
  setLanguage,
  Language as LanguageType
} from '../../store/options/language'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray } from '../../utils/data'
import { LoaderContext } from '../../shared/context/LoaderProvider'

interface Props {
  defaultValue?: string
  errors: FieldErrors<FieldValues>
  error: AxiosError
  onChange: (name: string, val: string, shouldValidate?: boolean) => void
}

const Language: FunctionComponent<Props> = props => {
  const dispatch = useDispatch()
  const { setShowLoader } = useContext(LoaderContext)

  const languageOptions = useSelector<RootState>(
    ({ options }) => options?.language
  ) as LanguageType[]

  const [{ data: choicesData, loading }, exec] = useAxios(
    {
      url: 'users/me/choices/',
      method: 'GET'
    },
    { manual: true }
  )

  useEffect(() => {
    setShowLoader(loading)
  }, [loading, setShowLoader])

  useEffect(() => {
    if (!languageOptions?.length) {
      exec()
    }
  }, [languageOptions, exec])

  useEffect(() => {
    if (choicesData?.language) {
      dispatch(
        setLanguage(
          convertJsonForSearchableSelectWithoutUrl(choicesData.language)
        )
      )
    }
  }, [choicesData, dispatch])
  const { errors, onChange, defaultValue, error } = props
  return (
    <React.Fragment>
      <Select
        defaultValue={defaultValue}
        options={languageOptions}
        label="Language"
        placeholder="Select Language"
        name="language"
        errormsg={
          errors?.language?.type === 'required' && 'Please select your Language'
        }
        onChange={onChange}
      />
      {extractErrorMsgFromArray(error, 'language')}
    </React.Fragment>
  )
}
export default Language
