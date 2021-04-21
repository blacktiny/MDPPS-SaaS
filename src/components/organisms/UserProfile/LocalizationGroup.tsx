import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import { ValidationOptions, FieldErrors, FieldValues } from 'react-hook-form'
import LocalizationSelect from './LocalizationSelect'
import axios from 'utils/http/client'

interface Props extends RouteComponentProps {
  errors: FieldErrors<FieldValues>
  register?: (validationOptions?: ValidationOptions) => React.Ref<Element>
  defaultValues?: {
    currency: string
    language: string
    timezone: string
  }
}

const LocalizationGroup: React.FC<Props> = ({ defaultValues, errors, register }) => {
  const [languageOptions, setLanguageOptions] = useState([])
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [timezoneOptions, setTimezoneOptions] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [selectedTimezone, setSelectedTimezone] = useState('Pacific/Honolulu')

  useEffect(() => {
    if (defaultValues.currency) {
      setSelectedCurrency(defaultValues.currency)
    }
    if (defaultValues.language) {
      setSelectedLanguage(defaultValues.language)
    }
    if (defaultValues.timezone) {
      setSelectedTimezone(defaultValues.timezone)
    }
  }, [defaultValues])

  useEffect(() => {
    axios({
      url: 'companies/choices',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        const { status, data } = response
        if (status === 200 && data) {
          const { currency, languages, timezones } = data
          if (currency) {
            setCurrencyOptions(
              currency.map(item => {
                return { text: item.name, value: item.id }
              })
            )
          }
          if (languages) {
            setLanguageOptions(
              languages.map(item => {
                return { text: item.name, value: item.id }
              })
            )
          }
          if (timezones) {
            setTimezoneOptions(
              timezones.map(item => {
                return { text: item.name, value: item.id }
              })
            )
          }
        }
      })
      .catch(error => {
        console.log('[API GET /companies/choices] error = ', error)
      })
  }, [])

  return (
    <React.Fragment>
      <Col>
        {/*   Language   */}
        <LocalizationSelect
          errors={errors}
          label="Language"
          name="language"
          defaultValue={selectedLanguage}
          options={languageOptions}
          onChange={() => {}}
          register={register}
        />
        {/*   Currency   */}
        <LocalizationSelect
          errors={errors}
          label="Currency"
          name="currency"
          defaultValue={selectedCurrency}
          options={currencyOptions}
          onChange={() => {}}
          register={register}
        />
      </Col>
      {/*   Time Zone   */}
      <LocalizationSelect
        errors={errors}
        label="Time Zone"
        name="timezone"
        defaultValue={selectedTimezone}
        options={timezoneOptions}
        onChange={() => {}}
        register={register}
      />
    </React.Fragment>
  )
}

export default LocalizationGroup

const Col = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  & > div {
    width: 100%;
    &:first-of-type {
      padding-right: 0.938rem;
    }
    &:nth-of-type(2) {
      padding-left: 0.938rem;
    }
  }
`
