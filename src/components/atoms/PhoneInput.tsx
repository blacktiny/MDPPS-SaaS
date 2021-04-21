import React, { useState, useEffect } from 'react'
import rfs, { ErrorMsg, boxModel } from '../../utils/style'
import FormFieldHeader from './FormFieldHeader'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import variables from '../../assets/styles/variables'
import PhoneInput2 from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { Input as RInput } from 'rsuite'
import { ValidationOptions } from 'react-hook-form'

const { Colors, DropShadow, Fonts } = variables

const PhoneNumberContainer = styled('div')<{
  disabled?: boolean
  invalid?: boolean
}>`
  ${({ disabled }) => (disabled ? DisabledStyle : null)}
  ${({ invalid }) => (invalid ? InvalidStyle : null)}
  position: relative;

  .react-tel-input {
    input {
      background: ${Colors.Gray[50]};
      border: 1px solid transparent;
      border-radius: 4px;
      font-size: ${rfs('12px')};
      height: ${boxModel('50px')};
      min-height: 32px;
      padding: ${boxModel('18px 20px 18px 70px')};
      transition: all 0.5s ease-in-out;
      width: 100%;
      color: ${Colors.Gray[500]};
      z-index: 2;
      &::placeholder {
        color: ${Colors.Gray[400]};
        &:first-letter {
          text-transform: capitalize;
        }
      }

      &:hover {
        background: ${Colors.Gray[100]};
        border-color: transparent;
      }
      &:focus,
      &:active {
        border: 1px solid ${Colors.Blue[200]} !important;
        background: ${Colors.Gray[25]} !important;

        &:hover {
          background: ${Colors.Gray[25]} !important;
        }
      }
      &:disabled {
        background: #f0f0f0 !important;
        pointer-event: none;
      }
    }
    .flag-dropdown {
      background-color: transparent;
      border: none;
      width: 100%;
      z-index: auto;
      &:hover,
      &:focus {
        .selected-flag {
          background-color: transparent;
        }
      }
      &.open .selected-flag {
        background-color: transparent;
      }
    }
    .selected-flag {
      position: relative;
      width: 3.625rem;
      height: 100%;
      padding: 0.813rem 0.875rem;
      border-radius: 0;
      z-index: 3;
      .flag {
        // margin-top: -12.5px;
        // width: 25px;
        // height: 25px;
        // border-radius: 50%;
        .arrow {
          left: ${boxModel('26px')};
          top: -8px;
          border: solid ${Colors.Gray[400]};
          border-width: 0 2px 2px 0;
          display: inline-block;
          padding: 0.188rem;
          transform: rotate(45deg);
        }
      }
    }
    .country-list {
      width: 100%;
      box-shadow: ${DropShadow.standard};
      margin: 0;
      padding: ${boxModel('10px 0')};
      .country {
        padding: ${boxModel('15px 20px')};
        color: ${Colors.Gray[400]};
        font-size: ${rfs(Fonts.Size.XSmall)};
        letter-spacing: 0.22px;
        cursor: pointer;
        &.highlight {
          background: ${Colors.Blue[25]};
          color: ${Colors.Blue[200]};
          .dial-code {
            color: ${Colors.Blue[200]};
          }
        }
        .dial-code {
          color: ${Colors.Gray[400]};
          font-size: ${rfs(Fonts.Size.XSmall)};
        }
      }
    }
  }
`
const DisabledStyle = css`
  .control-label {
    color: ${Colors.Gray[200]};
  }
  .react-tel-input {
    input {
      background-color: ${Colors.Gray[100]};
      cursor: not-allowed;
      &::placeholder {
        color: ${Colors.Gray[200]};
        padding-left: 0 !important;
      }
      &:hover,
      &:focus {
        background-color: ${Colors.Gray[100]} !important;
        border: none;
      }
    }
    .selected-flag .flag .arrow {
      border-color: ${Colors.Gray[200]};
    }
  }
  .help-block {
    color: ${Colors.Gray[200]};
  }
`
const InvalidStyle = css`
  .react-tel-input {
    input.form-control {
      background-color: ${Colors.Gray[25]};
      border: 1px solid ${Colors.Red[3]};
      color: ${Colors.Red[3]};
      &::placeholder {
        color: ${Colors.Red[3]};
      }
      &:hover {
        background-color: ${Colors.Gray[25]} !important;
        border: 1px solid ${Colors.Red[3]} !important;
      }
      &:focus {
        background-color: ${Colors.Gray[25]} !important;
        border: 1px solid ${Colors.Red[3]} !important;
      }
    }
    .selected-flag .flag .arrow {
      border-color: ${Colors.Red[3]} !important;
    }
  }
`

const PhoneNumberInput = styled(PhoneInput2)`
  position: relative;
  background: red;
  .PhoneInputCountry {
    position: absolute;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    .PhoneInputCountryIcon {
      width: ${boxModel('25px')};
      height: ${boxModel('26px')};
      border-radius: 50%;
      box-shadow: none;
      border: none;
      padding: 0 0;
      margin: 0;
      .PhoneInputCountryIconImg {
        width: ${boxModel('25px')};
        height: ${boxModel('25px')};
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .PhoneInputCountrySelectArrow {
      font-size: ${rfs('29px')};
      color: ${Colors.Gray[400]};
      opacity: 1;
      border-bottom-width: 2px;
      border-right-width: 2px;
      border-bottom-style: solid;
      border-right-style: solid;
    }
  }
  .PhoneInputCountrySelect:focus + .PhoneInputCountryIcon + .PhoneInputCountrySelectArrow {
    color: ${Colors.Gray[400]};
  }

  input {
    background: ${Colors.Gray[50]};
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: ${rfs('12px')};
    height: ${boxModel('50px')};
    min-height: 32px;
    padding: ${boxModel('18px 20px 18px 70px')};
    transition: all 0.5s ease-in-out;
    width: 100%;
    color: ${Colors.Gray[500]};

    &::placeholder {
      color: ${Colors.Gray[400]};
      &:first-letter {
        text-transform: capitalize;
      }
    }

    &:hover {
      background: ${Colors.Gray[100]};
      border-color: transparent;
    }
    &:focus,
    &:active {
      border: 1px solid ${Colors.Blue[200]} !important;
      background: ${Colors.Gray[25]};
    }
  }
`

const HiddenValidateInput = styled(RInput)`
  display: none;
`

const VerifiedMark = styled.div`
  position: absolute;
  top: 2.8rem;
  right: 1rem;
  bottom: 0.625rem;
  z-index: 2;

  span {
    color: #3be051;
  }
`

const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ChangeButton = styled.span`
  font-size: 0.75rem;
  color: ${Colors.Blue[200]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

interface Props {
  placeholder: string
  invalid?: boolean
  disabled?: boolean
  errormsg?: string
  name: string
  label: string
  text?: string
  setPhoneNumber: (data: string) => void
  setShowChangeModal?: () => void
  phoneValue?: string
  setPhoneError?: (data: boolean) => void
  showErrorWrapper?: boolean
  onChange?: () => void
  testId?: string
  errorMessageName?: string
  triggerRequiredValidation?: boolean
  hideValidationError?: boolean
  required?: boolean
  register?: (validationOptions?: ValidationOptions) => React.Ref<Element>
  verified?: boolean
}

const PhoneInput: React.FC<Props> = ({
  placeholder,
  name,
  label,
  disabled,
  invalid,
  text,
  setPhoneNumber,
  setShowChangeModal,
  phoneValue,
  setPhoneError,
  showErrorWrapper,
  onChange,
  testId,
  errorMessageName,
  triggerRequiredValidation,
  hideValidationError,
  required = false,
  errormsg,
  register,
  verified
}) => {
  const [validationError, setValidationError] = useState('')
  const [countryCode, setCountryCode] = useState('')

  useEffect(() => {
    // if (inputRef?.current?.getCountryData()?.dialCode) {
    //   setCountryCode(inputRef.current.getCountryData().dialCode)
    // }
  }, [])

  useEffect(() => {
    if (!phoneValue && showErrorWrapper && errormsg) {
      setValidationError(errormsg)
    }
  }, [errormsg, phoneValue, showErrorWrapper])

  const handleOnChange = (value: string, data: { dialCode: string }) => {
    const phoneValueWithoutCode = value.replace(/[^0-9]+/g, '').slice(data.dialCode.length)
    if (isValidPhoneNumber('+' + value)) {
      setPhoneError(false)
      setValidationError('')
    } else {
      if (!phoneValueWithoutCode) {
        setValidationError(`Please enter your ${errorMessageName || 'phone number'}`)
      } else {
        setValidationError(`Please enter a valid ${errorMessageName || 'phone number'}`)
      }
      setPhoneError(true)
    }
    if ((countryCode !== '' && countryCode !== data.dialCode) || (countryCode === '' && value === phoneValue)) {
      setPhoneNumber(data.dialCode)
      setValidationError(`Please enter your ${errorMessageName || 'phone number'}`)
    } else {
      setPhoneNumber(value)
    }
    // setPhoneNumber(value)

    setCountryCode(data.dialCode)
    if (onChange) {
      onChange()
    }
  }

  useEffect(() => {
    if (triggerRequiredValidation && !phoneValue) {
      setValidationError(`Please enter a valid ${errorMessageName || 'phone number'}`)
      setPhoneError(true)
    }
  }, [phoneValue, errorMessageName, triggerRequiredValidation, setPhoneError])

  return (
    <PhoneNumberContainer data-testid={testId} invalid={invalid} disabled={disabled}>
      <ContainerHeader>
        <FormFieldHeader label={label} name={name} text={text} required={required} />
        {verified && (
          <ChangeButton
            onClick={() => {
              if (setShowChangeModal) setShowChangeModal()
            }}
          >
            Change
          </ChangeButton>
        )}
      </ContainerHeader>
      <div data-testid={'phone'}>
        <PhoneNumberInput
          country={'us'}
          value={phoneValue}
          placeholder={placeholder}
          onChange={handleOnChange}
          name={name}
          countryCodeEditable={false}
          className="phone-number-input"
          autoComplete="off"
          disabled={verified}
        />
        {verified && (
          <VerifiedMark>
            <span className="icon-nav-check" />
          </VerifiedMark>
        )}
      </div>
      {register && <HiddenValidateInput name={name} value={phoneValue} inputRef={register({ required: required })} />}

      {!hideValidationError && validationError && <ErrorMsg>{validationError}</ErrorMsg>}
    </PhoneNumberContainer>
  )
}
PhoneInput.displayName = 'PhoneInput'

export default PhoneInput
