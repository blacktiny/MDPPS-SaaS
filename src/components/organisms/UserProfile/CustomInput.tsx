import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { FieldElement } from 'react-hook-form'
import Input from 'components/atoms/Input'

const CustomInputWrapper = styled.div`
  position: relative;

  &.fixed-placeholder {
    input {
      padding-left: 8.8rem !important;
    }
  }

  &.password {
    .top-right-label {
      color: #4284fc;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .top-right-label {
    position: absolute;
    top: 2px;
    right: 0;
    color: #333333;
    font-size: 0.75rem;
    letter-spacing: 0.22px;
  }
`

const FixedPlaceholder = styled.div`
  position: absolute;
  top: 2.2rem;
  color: #98a0ac;
  font-size: 0.75rem;
  height: 3.125rem;
  padding: 0.625rem 0 0.625rem 1.25rem;
  z-index: 1;
`

interface Props {
  classNames?: string
  name?: string
  type?: string
  placeholder?: string
  label?: string
  onChange: () => void
  invalid?: boolean
  customRef?: React.Ref<Element | FieldElement>
  errormsg?: string
  required?: boolean
  fixedPlaceholder?: string
  customTopRightLabel?: string
  customTopRightLabelClicked?: () => void
}

const CustomInput: FunctionComponent<Props> = props => {
  const {
    classNames = '',
    errormsg,
    fixedPlaceholder,
    label,
    name,
    placeholder,
    type = 'text',
    invalid,
    onChange,
    customRef,
    customTopRightLabel,
    customTopRightLabelClicked,
    required
  } = props

  return (
    <CustomInputWrapper className={classNames + (fixedPlaceholder ? ' fixed-placeholder' : '')}>
      {fixedPlaceholder && <FixedPlaceholder>{fixedPlaceholder}</FixedPlaceholder>}
      {customTopRightLabel ? (
        <div
          className="top-right-label"
          onClick={() => {
            if (customTopRightLabelClicked) customTopRightLabelClicked()
          }}
        >
          {customTopRightLabel}
        </div>
      ) : (
        <React.Fragment />
      )}
      <Input
        label={label}
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        invalid={invalid}
        ref={customRef}
        errormsg={errormsg}
        required={required}
      />
    </CustomInputWrapper>
  )
}

export default CustomInput
