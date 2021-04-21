/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { AxiosError } from 'axios'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Tooltip, Whisper } from 'rsuite'
import { useForm } from 'react-hook-form'
import variables from '../../../../assets/styles/variables'
import Button from '../../../../components/atoms/Button'
import Checkbox from '../../../../components/atoms/Checkbox'
import Input from '../../../../components/atoms/Input'
import AutoComplete from '../../../../components/atoms/AutoComplete'
import Select from '../../../../components/atoms/SearchableSelect'
import { AccountTypeKey, AccountTypeOptions, RegexPatterns } from '../../../../constants/common'
import { extractErrorMsgFromArray } from '../../../../utils/data'
import rfs from '../../../../utils/style'
import { debounce } from 'lodash'
import { useScreenSize } from '../../../../hooks/useScreenSize'
import axios from '../../../../utils/http/client'

const { Colors } = variables

const SingUplink = styled.a`
  color: ${Colors.Blue[200]} !important;
  letter-spacing: 0.28px;
  &::first-letter {
    text-transform: capitalize;
  }
`
const CheckboxDiv = styled.div`
  margin: ${rfs('5px')} 0 ${rfs('45px')};
`
const InputContainer = styled.div`
  margin-bottom: ${rfs('35px')};
`
const StyledForm = styled.form`
  .input-header {
    margin-bottom: 5px;
    label {
      line-height: 20px;
    }
  }
  .rs-checkbox,
  .rs-checkbox-checker {
    label {
      line-height: 14px;
    }
  }
  .checkbox-text {
    margin-bottom: 10px;
    line-height: 20px;
  }
  .control-label {
    color: #14171a !important;
  }
  button[type='submit'] {
    padding: ${rfs('15px')} ${rfs('37px')} !important;
  }
`

export interface FormDataType {
  first_name: string
  last_name: string
  email: string
  account_type: string
  business_name: string | number
  password: string
  terms_agree: boolean
}

interface LoginFormProps {
  formData?: FormDataType
  onSubmit: (data: FormDataType) => void
  onChange?: (value: string[]) => void
  error?: AxiosError
  invited?: boolean
  company?: string
}

export const Form: React.FC<LoginFormProps> = ({ formData, onSubmit, error: errorResponse, invited, company }) => {
  const tooltipPasswordTriggerRef = React.useRef(null)
  const tooltipPasswordOpen = () => tooltipPasswordTriggerRef?.current?.show()
  const tooltipPasswordClose = () => tooltipPasswordTriggerRef?.current?.hide()

  const tooltipCompanyTriggerRef = React.useRef(null)
  const tooltipCompanyOpen = () => tooltipCompanyTriggerRef?.current?.show()
  const tooltipCompanyClose = () => tooltipCompanyTriggerRef?.current?.hide()

  const { width: windowWidth } = useScreenSize()

  const [error, setError] = useState(errorResponse)

  const [isInitialCompanyFocus, setInitialCompanyFocus] = useState(true)

  const [companyValue, setCompanyValue] = useState(company || '')
  const [companiesList, setCompaniesList] = useState([])

  const [showErrors, setShowErrors] = useState({
    email: false,
    first: false,
    last: false,
    password: false,
    accountType: false,
    business_name: false
  })

  const { register, unregister, watch, handleSubmit, errors, clearError, getValues, setValue } = useForm<FormDataType>({
    mode: 'onChange',
    defaultValues: formData
  })

  useEffect(() => {
    setError(errorResponse)
  }, [errorResponse])

  useEffect(() => {
    register({ name: 'account_type' }, { required: !invited })
    watch('account_type')
    setValue('email', formData.email)
  }, [invited, formData])

  useEffect(() => {
    if (company || getValues().account_type === AccountTypeKey.EMPLOYEE) {
      register({ name: 'business_name' }, { required: true })
      watch('business_name')

      if (company) {
        setValue('business_name', company, true)
        setCompanyValue(company)
      }
    } else {
      clearError('business_name')
      unregister('business_name')
      setValue('business_name', '', true)
      setCompanyValue('')
    }
  }, [company, getValues().account_type])

  const passwordStrengthValidation = useRef(0)

  const updateScoreRef = (value: number) => {
    passwordStrengthValidation.current = value
    watch('password')
  }

  const formSubmit = (data: FormDataType) => {
    setError(null)

    setShowErrors({
      email: true,
      first: false,
      last: false,
      password: true,
      accountType: !invited,
      business_name: true
    })

    let account_type = ''
    if (invited) {
      account_type = 'employee'
    } else if (!invited && !getValues().account_type) {
      account_type = 'brand'
    } else {
      // eslint-disable-next-line prefer-destructuring
      account_type = getValues().account_type
    }

    onSubmit({ ...data, account_type })
  }

  const getTooltipPlacement = useCallback(() => {
    if (windowWidth >= 1500) {
      return 'right'
    } else {
      return 'topEnd'
    }
  }, [windowWidth])

  const getTooltipStyle = useCallback(
    (field?: string) => {
      const style: any = {}

      if (windowWidth >= 1500) {
        style.transform = 'translate(20px, 10px)'
      } else {
        style.transform = 'translateY(15px)'
      }

      if (
        !(!!(errors?.business_name || extractErrorMsgFromArray(error, 'business_name')) && !isInitialCompanyFocus) &&
        field !== 'password'
      ) {
        style.opacity = '0'
      }

      return style
    },
    [windowWidth, isInitialCompanyFocus, errors?.business_name]
  )

  const isSubmitDisabled = () => false && Object.keys(errors).length > 0

  const handleFetchCompanies = async (query: string) => {
    const { data } = await axios.get(`business/?business_name__istartswith=${query}`)

    const list =
      data?.map(({ business_name, id }: any) => ({
        label: business_name,
        value: id
      })) || []

    setCompaniesList(list.slice(0, 4))
  }

  const onSuggestionsFetchRequested = useCallback(debounce(handleFetchCompanies, 500), [])

  const handleChangeCompanies = async (query: string, e: any) => {
    setCompanyValue(query)

    const company = companiesList.find(({ label }) => label === query)
    if (company) {
      setValue('business_name', company.value, false)
    } else {
      setValue('business_name', query, false)
    }

    onSuggestionsFetchRequested(query)
  }

  return (
    <StyledForm onSubmit={handleSubmit(formSubmit)}>
      <InputContainer>
        <Input
          label="Email Address"
          placeholder="youremail@domain.com"
          name="email"
          invalid={!!(errors?.email || (showErrors.email && extractErrorMsgFromArray(error, 'email')))}
          onChange={() => {
            setShowErrors({ ...showErrors, email: false })
          }}
          ref={register({
            required: true,
            pattern: RegexPatterns.EMAIL
          })}
          setReadOnlyStyle={invited}
          errormsg={
            (errors?.email?.type === 'required' && 'Please enter your email address') ||
            (errors?.email?.type === 'pattern' && 'Please enter a valid email address')
          }
        />
        {showErrors.email && extractErrorMsgFromArray(error, 'email')}
      </InputContainer>

      <InputContainer>
        <Whisper
          triggerRef={tooltipPasswordTriggerRef}
          placement={getTooltipPlacement()}
          trigger="click"
          speaker={
            <Tooltip style={getTooltipStyle('password')}>
              Minimum of 8 characters containing at least one upper case letter, a symbol and a number
            </Tooltip>
          }
        >
          <Input
            placeholder="Your password"
            name="password"
            label="Password"
            type="password"
            onFocus={() => setTimeout(() => tooltipPasswordOpen(), 100)}
            onBlur={() => setTimeout(() => tooltipPasswordClose(), 100)}
            characters={watch('password')}
            showPasswordStatus
            onChange={() => {
              setShowErrors({ ...showErrors, password: false })
            }}
            invalid={!!(errors?.password || (showErrors.password && extractErrorMsgFromArray(error, 'password')))}
            updateScoreRef={updateScoreRef}
            ref={register({
              validate: value => {
                return !value ? 'Please enter a password' : true
              }
            })}
            errormsg={errors?.password?.type === 'validate' && (errors?.password?.message as string)}
          />
        </Whisper>

        {showErrors.password && extractErrorMsgFromArray(error, 'password')}
      </InputContainer>

      <div className="row">
        <div className="col-xs-6">
          <InputContainer>
            <Select
              label="Account Type"
              placeholder="Select"
              name="account_type"
              options={AccountTypeOptions}
              onChange={setValue}
              disabled={invited}
              defaultValue={invited ? 'employee' : undefined}
              invalid={!!(errors?.account_type || extractErrorMsgFromArray(error, 'account_type'))}
              errormsg={errors?.account_type?.type === 'required' && 'Please enter your account type.'}
            />

            {extractErrorMsgFromArray(error, 'account_type')}
          </InputContainer>
        </div>
        <div className="col-xs-6">
          <InputContainer className={company || getValues().account_type === AccountTypeKey.EMPLOYEE ? '' : 'hidden'}>
            <Whisper
              triggerRef={tooltipCompanyTriggerRef}
              placement={getTooltipPlacement()}
              trigger="click"
              speaker={
                <Tooltip style={getTooltipStyle()}>
                  If you are the company owner or an authorized representative, please sign up your company as a brand,
                  manufacturer, distributor, or a dealer.
                </Tooltip>
              }
            >
              <AutoComplete
                data={companiesList.map(({ label }) => label)}
                value={companyValue}
                onChange={handleChangeCompanies}
                onFocus={() => setTimeout(() => tooltipCompanyOpen(), 100)}
                onBlur={() => {
                  setTimeout(() => {
                    tooltipCompanyClose()

                    if (isInitialCompanyFocus) {
                      setInitialCompanyFocus(false)
                    }

                    if (!companiesList.find(({ value }) => value === getValues().business_name)) {
                      setValue('business_name', '', true)
                    }
                  }, 300)
                }}
                onSelect={({ label }) => {
                  const value = companiesList.find(({ label: cLabel }) => cLabel === label)?.value
                  setValue('business_name', value, true)
                }}
                placeholder={'Your company'}
                label={'Company Name'}
                name={'business_name'}
                dataTestid={`business_name`}
                defaultValue={company}
                disabled={invited}
                errormsg={
                  errors?.business_name?.type === 'required' &&
                  !isInitialCompanyFocus &&
                  'The company does not exist on the platform.'
                }
                invalid={
                  !!(errors?.business_name || extractErrorMsgFromArray(error, 'business_name')) &&
                  !isInitialCompanyFocus
                }
              />
            </Whisper>

            {extractErrorMsgFromArray(error, 'business_name')}
          </InputContainer>
        </div>
      </div>

      <CheckboxDiv>
        <Checkbox
          className="checkbox-text"
          title="Data Processing Terms"
          data-testid={`terms_agree`}
          name={`terms_agree`}
          ref={register({
            required: true
          })}
          errormsg={errors?.terms_agree?.type === 'required' && 'Please accept the terms to proceed'}
        >
          By clicking &quot;Sign Up&quot; you agree to{' '}
          <SingUplink href="https://mdpps.com/terms-service/" target="_blank">
            Data processing Terms
          </SingUplink>{' '}
          and <SingUplink href="https://mdpps.com/privacy-policy/">Privacy Policy</SingUplink>
        </Checkbox>

        {extractErrorMsgFromArray(error, 'terms_agree')}
      </CheckboxDiv>

      {extractErrorMsgFromArray(error)}

      <div className="row">
        <div className="col-xs-6 offset-xs-6">
          <Button
            type="submit"
            disabled={isSubmitDisabled()}
            block
            onClick={() => {
              if (isInitialCompanyFocus) {
                setInitialCompanyFocus(false)
              }
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </StyledForm>
  )
}
