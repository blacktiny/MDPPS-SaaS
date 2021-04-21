import React, { useState, useEffect, ReactNode } from 'react'
import styled from '@emotion/styled'
import rfs, { boxModel, ErrorMsg } from '../../../utils/style'
import { Input as RInput } from 'rsuite'
import variables from '../../../assets/styles/variables'
import { InputProps } from 'rsuite/lib/Input/Input'
import { css } from '@emotion/core'
import loadable from '@loadable/component'
import FormFieldHeader from '../FormFieldHeader'
import EyeVisible from '../../../assets/icons/nav-eye.svg'
import EyeInvisible from '../../../assets/icons/eye-disabled.svg'
import { FieldElement } from 'react-hook-form'
import className from 'classnames'
import './style.scss'

const PasswordStrengthBar = loadable(() => import('react-password-strength-bar'))

const { Colors, Fonts } = variables

const DisabledStyle = css`
  .control-label {
    color: ${Colors.Gray[200]};
  }
  .base-input {
    background-color: #f0f0f0;
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
  .help-block {
    color: ${Colors.Gray[200]};
  }
`
const InvalidStyle = css`
  .base-input {
    background-color: ${Colors.Gray[25]};
    border: 1px solid ${Colors.Red[3]};
    color: ${Colors.Red[3]};
    &:hover {
      background-color: ${Colors.Gray[25]};
      border: 1px solid ${Colors.Red[3]};
    }
  }
`

const BaseInput = styled(RInput)`
  background: ${Colors.Gray[50]};
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: ${rfs('12px')};
  height: ${boxModel('50px')};
  padding: ${boxModel('10px 20px')};
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
    &:hover {
      background: ${Colors.Gray[25]} !important;
    }
    border: 1px solid ${Colors.Blue[200]};
    background: ${Colors.Gray[25]} !important;
  }
  &[disabled] {
    background: #f0f0f0 !important;
  }
`
const InputContainer = styled('div')<{ disabled?: boolean; invalid?: boolean }>`
  ${({ disabled }) => (disabled ? DisabledStyle : null)}
  ${({ invalid }) => (invalid ? InvalidStyle : null)}
  .password-strength-bar {
    border-radius: 2px;
    div[style='width: 4px;'] {
      display: none;
    }
    & > div {
      margin-top: 12px !important;
      max-width: 13.625rem;
      & > div {
        transition: 0.5s ease;
        height: 10px !important;
      }
    }
    p {
      margin: 0 !important;
      position: absolute;
      right: 0;
      top: -5px;
      font-size: ${rfs(Fonts.Size.XXSmall)} !important;
    }
    &.very-weak > div > div:first-of-type {
      background-color: ${Colors.Red[3]} !important;
    }
  }
`

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 3px;
`
const PasswordVisibilityToggle = styled.button`
  position: absolute;
  right: ${rfs('20px')};
  z-index: 2;
  background: transparent;
  padding: 0;
  font-size: 0;
  &:focus {
    outline: none;
  }
  img {
    width: 1.25rem;
  }
`

interface Props extends InputProps {
  placeholder?: string
  name: string
  invalid?: boolean
  disabled?: boolean
  type?: string
  errormsg?: string
  text?: string | ReactNode
  ref?: React.Ref<FieldElement | Element>
  updateScoreRef?: (value: number) => void
  defaultValue?: string
  onChange?: (value?) => void
  onFocus?: () => void
  onBlur?: () => void
  showErrorWrapper?: boolean
  characters?: string
  testErrorId?: string
  disableLabel?: boolean
  setReadOnlyStyle?: boolean
  containerClassName?: string
  inputClassName?: string
  required?: boolean
  value?: string
  maxLength?: number
}

const Input: React.FC<Props> = React.forwardRef(
  (
    {
      name,
      label,
      placeholder,
      disabled,
      invalid,
      type,
      showPasswordStatus,
      errormsg,
      text,
      updateScoreRef,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      showErrorWrapper,
      characters,
      testErrorId,
      disableLabel = true,
      setReadOnlyStyle,
      containerClassName,
      inputClassName,
      required,
      value,
      maxLength
    },
    ref
  ) => {
    const [password, setPassword] = useState('')
    const [passwordStrengthScore, setPasswordStrengthScore] = useState(0)
    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const updatePasswordStrengthScore = (score: number) => {
      updateScoreRef(score)
      setPasswordStrengthScore(score)
    }

    const onChangeInput = value => {
      if (onChange) {
        onChange(value)
      }
    }

    const onBlurInput = () => {
      if (onBlur) {
        onBlur()
      }
    }

    const onFocusInput = () => {
      if (onFocus) {
        onFocus()
      }
    }

    useEffect(() => {
      if (characters === '' || characters) setPassword(characters)
    }, [characters])

    const baseInputStyle = className({
      'base-input': true,
      'readonly-field': setReadOnlyStyle
    })
      .concat(' ')
      .concat(inputClassName)

    return (
      <InputContainer invalid={invalid} disabled={disableLabel && disabled} className={containerClassName}>
        <FormFieldHeader label={label} name={name} text={text} required={required} />
        <InputGroup>
          <BaseInput
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            className={baseInputStyle}
            disabled={disabled}
            type={type === 'password' ? (passwordVisibility ? 'text' : type) : type}
            onChange={onChangeInput}
            onBlur={onBlurInput}
            onFocus={onFocusInput}
            inputRef={ref}
            autoComplete={type === 'password' ? 'new-password' : 'off'}
            defaultValue={defaultValue}
            maxLength={maxLength}
          />
          {type === 'password' && (
            <PasswordVisibilityToggle
              className="visibility"
              onClick={() => {
                setPasswordVisibility(!passwordVisibility)
              }}
              type="button"
            >
              <img src={passwordVisibility ? EyeInvisible : EyeVisible} alt="toggle-visibility" />
            </PasswordVisibilityToggle>
          )}
        </InputGroup>
        <div className={showErrorWrapper ? 'error-wrapper' : ''}>
          {errormsg && (
            <ErrorMsg data-testid={testErrorId} className={!showErrorWrapper ? '' : 'my-0'}>
              {errormsg}
            </ErrorMsg>
          )}
        </div>
        {type === 'password' && password.length > 0 && showPasswordStatus && (
          <PasswordStrengthBar
            password={password}
            className={`password-strength-bar${passwordStrengthScore === 0 ? ' very-weak' : ''}`}
            shortScoreWord="Weak"
            scoreWords={['Weak', 'Weak', 'Moderate', 'Good', 'Strong']}
            barColors={[Colors.Gray[100], Colors.Orange[200], Colors.Orange[150], Colors.Blue[150], Colors.Green[300]]}
            minLength={8}
            onChangeScore={updatePasswordStrengthScore}
          />
        )}
      </InputContainer>
    )
  }
)

Input.displayName = 'Input Container'
export default Input
