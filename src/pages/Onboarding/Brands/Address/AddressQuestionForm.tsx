import React, { useEffect, useState, Dispatch } from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from '@reach/router'
import { AxiosError } from 'axios'
import StreetAddress from '../../../../components/organisms/onboarding-questions/StreetAddress'
import City from '../../../../components/organisms/onboarding-questions/City'
import PostalCode from '../../../../components/organisms/onboarding-questions/PostalCode'
import StreetAddress2 from '../../../../components/organisms/onboarding-questions/StreetAddress2'
import Country from '../../../../components/organisms/onboarding-questions/Country'
import QuestionsButtonsGroup from '../../../../components/organisms/onboarding/QuestionsButtonsGroup'
import SelectState from '../../../../components/organisms/onboarding-questions/SelectState'
import PhoneInputCode from '../../../../components/organisms/onboarding-questions/PersonalPhoneInputCode'
import { ButtonsWrapper, FormContainer, FormWrapper, Title } from '../StyledComponents'
import { extractErroraddressMessage } from 'utils/data'
import { ErrorMsg } from 'utils/style'

type FormData = {
  address1: string
  address2: string
  city: string
  state: string
  zip_code: string
  country: string
  PhoneNumber: string
}

interface Props extends RouteComponentProps {
  data?: FormData
  onSubmit: (data: FormData) => void
  error: AxiosError
  backPath: string
  pageType?: string
  lastStep?: boolean
  isCustomer?: boolean
  setPhoneNumber: (data: string) => void
  phoneValue: string
  setPhoneError: (data: boolean) => void
  phoneError: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  showErrors: {
    address: boolean
    city: boolean
    postalCode: boolean
    address2: boolean
    state: boolean
    PhoneNumber: boolean
  }
}

const AddressQuestionForm: React.FC<Props> = ({
  data,
  onSubmit,
  error,
  backPath,
  lastStep,
  isCustomer,
  showErrors,
  setPhoneNumber,
  setPhoneError,
  phoneError,
  phoneValue,
  setShowErrors
}) => {
  const { register, handleSubmit, errors, getValues, setValue } = useForm<FormData>({
    defaultValues: data,
    mode: 'onChange'
  })
  const [firstTime, setfirstTime] = useState(true)
  const [countryId, setCountryId] = useState('')
  const [defaultState, setDefaultState] = useState('')

  useEffect(() => {
    Object.keys(getValues()).forEach(key => {
      if (data) {
        let value = data[key]

        if (value) {
          setValue(key, value, true)
        }
      }
    })

    if (data && firstTime) {
      setfirstTime(false)
    }

    const countryStr = getValues().country
    if (countryStr) {
      setCountryId(countryStr.match(/\d+/) ? countryStr.match(/\d+/)[0] : '')
    }
    setDefaultState(getValues().state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Title>{isCustomer ? 'Address' : 'Corporate Address'}</Title>
        <div className="row">
          <div className={isCustomer ? 'col-12' : 'col-6'}>
            <Country
              register={register}
              key="country"
              errors={errors}
              error={error}
              onChange={(name, val, shouldValidate) => {
                setCountryId(val.match(/\d+/) ? val.match(/\d+/)[0] : '0')
                setDefaultState('')
                setValue(name, val, shouldValidate)
              }}
              defaultValue={getValues().country}
              showErrorWrapper={true}
              required
            />
          </div>
          {!isCustomer && (
            <div className="col-6">
              <PhoneInputCode
                register={register}
                setPhoneNumber={setPhoneNumber}
                setPhoneError={setPhoneError}
                errors={errors}
                key="phoneNumber"
                name={'PhoneNumber'}
                phoneError={phoneError}
                phoneValue={phoneValue}
                setShowErrors={setShowErrors}
                showErrors={showErrors}
                errorExtractedMsg={<ErrorMsg>{extractErroraddressMessage(error, 'phone_number')}</ErrorMsg>}
                required
                label={'Office Phone Number'}
              />
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-6">
            <StreetAddress
              errors={errors}
              register={register}
              key="address1"
              error={error}
              isCustomer={isCustomer}
              setShowErrors={setShowErrors}
              showErrors={showErrors}
              placeholder={'Street Address'}
              required
            />
          </div>
          <div className="col-6">
            <StreetAddress2
              errors={errors}
              register={register}
              key="address2"
              error={error}
              isCustomer={isCustomer}
              setShowErrors={setShowErrors}
              showErrors={showErrors}
              label={'Street Address 2'}
              placeholder={'Street Address 2'}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <City
              errors={errors}
              register={register}
              key="city"
              error={error}
              isCustomer={isCustomer}
              setShowErrors={setShowErrors}
              showErrors={showErrors}
              placeholder={'City'}
              required
            />
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <SelectState
                  defaultValue={defaultState}
                  countryId={countryId}
                  register={register}
                  errors={errors}
                  key="state"
                  error={error}
                  isCustomer={isCustomer}
                  showErrors={showErrors}
                  onChange={setValue}
                  showErrorWrapper={true}
                  required
                />
              </div>
              <div className="col-6">
                <PostalCode
                  errors={errors}
                  register={register}
                  key="postal"
                  error={error}
                  isCustomer={isCustomer}
                  setShowErrors={setShowErrors}
                  showErrors={showErrors}
                  placeholder={'Zip / Postal Code'}
                  maxLength={10}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </FormContainer>
      <ButtonsWrapper>
        <QuestionsButtonsGroup
          firstStep={false}
          backPath={backPath}
          type={isCustomer ? 'threeCol' : 'twoCol'}
          lastStep={lastStep}
        />
      </ButtonsWrapper>
    </FormWrapper>
  )
}

export default AddressQuestionForm
