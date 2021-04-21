import React, { useEffect, useState, ReactElement } from 'react'
import { Dropdown, DropdownProps } from 'semantic-ui-react'
import styled from '@emotion/styled'
import variables from '../../assets/styles/variables'
import { css } from '@emotion/core'
import FormFieldHeader from './FormFieldHeader'
import { ErrorMsg } from '../../utils/style'
import { debounce } from 'lodash'
import { Loader } from 'rsuite'
const { Colors } = variables

const DisabledStyle = css`
  .control-label {
    color: ${Colors.Gray[200]};
  }
  .dropdown-select {
    pointer-events: none;

    input,
    .ui.fluid.selection.dropdown[role='listbox'],
    .ui.fluid.dropdown {
      background-color: ${Colors.Gray[50]};
      &::placeholder {
        color: ${Colors.Gray[200]};
        padding-left: 0 !important;
      }
      &:hover {
        background-color: ${Colors.Gray[100]};
      }
      &:focus,
      &:focus div.text {
        background-color: ${Colors.Gray[50]} !important;
        border: none !important;

        &:hover {
          background-color: ${Colors.Gray[50]} !important;
        }
      }
      div.text {
      }
    }

    &__container {
      & div {
        background-color: #f0f0f0 !important;
      }
    }
  }
  .help-block {
    color: ${Colors.Gray[200]};
  }
`

const InvalidStyle = css`
  .dropdown-select {
    .ui.fluid.dropdown {
      div.text {
        border-color: ${Colors.Red[3]} !important;
        background: ${Colors.Gray[25]} !important;
      }

      &:focus {
        div.text {
          border-color: ${Colors.Red[3]} !important;
        }
      }
    }

    .ui.search.dropdown {
      input {
        border: 1px solid ${Colors.Red[3]};
        background-color: ${Colors.Gray[25]};
        color: ${Colors.Red[3]};
        &::placeholder {
          color: ${Colors.Red[3]};
        }
        &:hover {
          background-color: ${Colors.Gray[25]};
          border: 1px solid ${Colors.Red[3]};
        }
      }
    }
  }
`

const SelectWrapper = styled('div')<{
  disabled?: boolean
  invalid?: boolean
}>`
  ${({ disabled }) => (disabled ? DisabledStyle : null)}
  ${({ invalid }) => (invalid ? InvalidStyle : null)}
`

export interface Props {
  placeholder: string
  options: { text: string; value: string; key: string }[]
  name: string
  errormsg?: string
  label?: string
  invalid?: boolean
  disabled?: boolean
  defaultValue?: string
  searchable?: boolean
  showErrorWrapper?: boolean
  loading?: boolean
  onChange?: (name: string, value: string, shouldValidate?: boolean) => void
  onChangeType?: (val: string) => void
  handleSearchChange?: (val: string) => void
  handleChange?: (val: string) => void
  customIconClass?: string | ReactElement
  className?: string
  required?: boolean
}

const Select: React.FC<Props> = ({
  options,
  disabled,
  label,
  name,
  errormsg,
  defaultValue,
  placeholder,
  searchable,
  showErrorWrapper,
  loading,
  onChangeType,
  onChange,
  handleSearchChange,
  handleChange,
  customIconClass,
  className,
  required = false,
  invalid
}) => {
  const [state, setState] = useState(null)
  const setValue = (e: React.SyntheticEvent, val: DropdownProps) => {
    setState(val.value)
    onChange(name, val.value.toString(), true)
    if (onChangeType) {
      onChangeType(val.value.toString())
    }
    if (handleChange) {
      handleChange(val.value.toString())
    }
  }

  useEffect(() => {
    setState(defaultValue)
  }, [defaultValue])

  return (
    <SelectWrapper invalid={invalid} disabled={disabled}>
      <div className="dropdown-select">
        <FormFieldHeader label={label} name={name} required={required} />
        <div className="dropdown-select__container location-dropdown">
          <Dropdown
            className={className}
            icon={{ className: customIconClass }}
            placeholder={placeholder}
            autoComplete="off"
            fluid
            search={searchable}
            selection
            onChange={setValue}
            onSearchChange={debounce((_e, { searchQuery }) => {
              if (handleSearchChange) {
                handleSearchChange(searchQuery)
                setState(searchQuery)
              }
            }, 500)}
            options={options}
            data-testid={`select-${name}`}
            value={state}
            disabled={loading || disabled}
          />
          {loading && <Loader className="loader" />}
        </div>
        <div className={showErrorWrapper ? 'error-wrapper' : ''}>
          <ErrorMsg className={!showErrorWrapper ? '' : 'my-0'}>{errormsg}</ErrorMsg>
        </div>
      </div>
    </SelectWrapper>
  )
}

export default Select
