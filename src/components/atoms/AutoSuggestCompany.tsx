import React, { useState, useCallback } from 'react'
import { InputProps } from 'rsuite/lib/Input/Input'
import Autosuggest, { SuggestionsFetchRequested } from 'react-autosuggest'
import FormFieldHeader from './FormFieldHeader'
import rfs, { ErrorMsg, boxModel } from '../../utils/style'
import variables from '../../assets/styles/variables'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { KeyCodes } from '../../constants/common'
import { Loader } from 'rsuite'
import axios from '../../utils/http/client'
import { debounce } from 'lodash'
import { clearConsole } from '../../utils/console/clearConsole'

const { Colors, DropShadow, Fonts } = variables

const AutoSuggestContainer = styled('div')<{
  disabled?: boolean
  invalid?: boolean
}>`
  ${({ disabled }) => (disabled ? DisabledStyle : null)}
  ${({ invalid }) => (invalid ? InvalidStyle : null)}
`
const DisabledStyle = css`
  .control-label {
    color: ${Colors.Gray[200]};
  }
  .autosuggest-input {
    input {
      background-color: ${Colors.Gray[50]};
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
  }
  .help-block {
    color: ${Colors.Gray[200]};
  }
`
const InvalidStyle = css`
  .autosuggest-input {
    input {
      background-color: ${Colors.Gray[25]};
      border: 1px solid ${Colors.Red[3]};
      color: ${Colors.Red[3]};
      &:hover {
        background-color: ${Colors.Gray[25]};
        border: 1px solid ${Colors.Red[3]};
      }
    }
  }
`
const AutosuggestInput = styled.div`
  position: relative;
  .loader {
    position: absolute;
    right: ${rfs('20px')};
    top: 50%;
    transform: translateY(-50%);
  }
  input {
    background: ${Colors.Gray[50]};
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: ${rfs(Fonts.Size.XSmall)};
    height: ${boxModel('50px')};
    min-height: 32px;
    padding: ${boxModel('18px 20px')};
    transition: background 0.5s ease-in-out;
    width: 100%;
    color: ${Colors.Gray[500]};
    outline: none;

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
      border: 1px solid ${Colors.Blue[200]};
      background: ${Colors.Gray[25]};
    }
  }
  #react-autowhatever-1 {
    ul {
      box-shadow: ${DropShadow.standard};
      max-height: 200px;
      overflow-y: auto;
      position: absolute;
      width: 100%;
      background: ${Colors.Gray[25]};
      padding: ${boxModel('10px 0')};
      list-style: none;
      z-index: 9;
      li {
        padding: ${boxModel('15px 20px')};
        color: ${Colors.Gray[400]};
        font-size: ${rfs(Fonts.Size.XSmall)};
        letter-spacing: 0.22px;
        cursor: pointer;
        &:hover {
          background: ${Colors.Blue[25]};
          color: ${Colors.Blue[200]};
        }
      }
    }
  }
`

interface Props extends InputProps {
  placeholder: string
  data?: { business_name: string; url: string; id: number }[]
  name: string
  errormsg?: string
  label?: string
  invalid?: boolean
  disabled?: boolean
  isLoading?: boolean
  handleChange?: (value: string) => void
}

const AutoSuggestComp: React.FC<Props> = ({
  placeholder,
  // data,
  errormsg,
  label,
  name,
  invalid,
  defaultValue,
  disabled,
  handleChange
  // isLoading
}) => {
  // Teach Autosuggest how to calculate suggestions for any given input value.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getSuggestions = (value: string, fetchedData: any[]) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : fetchedData
      ? fetchedData.filter(
          (lang: { business_name: string }) => lang.business_name.toLowerCase().slice(0, inputLength) === inputValue
        )
      : []
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const renderSuggestion = ({ business_name }: { business_name: string }) => business_name

  const [value, setValue] = useState(defaultValue || '')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (event: any, { newValue }: { newValue: string }) => {
    setValue(newValue)
    handleChange(newValue)
  }

  const loadSuggestions = ({ value }: { value: string }) => {
    setLoading(true)
    axios({
      url: `business/?business_name__istartswith=${value}`,
      method: 'GET'
    })
      .then(({ data }) => {
        setLoading(false)
        setSuggestions(getSuggestions(value, data))
      })
      .catch(() => {
        clearConsole()
      })
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = useCallback(debounce(loadSuggestions, 500), [])

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.keyCode) {
      case KeyCodes.ENTER: {
        event.preventDefault()
      }
    }
  }

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: placeholder,
    value,
    onChange: onChange,
    onKeyDown: onKeyDown,
    name,
    id: name
  }
  return (
    <AutoSuggestContainer invalid={invalid} disabled={disabled}>
      <FormFieldHeader label={label} name={name} />
      <AutosuggestInput className="autosuggest-input">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={(onSuggestionsFetchRequested as unknown) as SuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={renderSuggestion}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        {loading && <Loader className="loader" />}
      </AutosuggestInput>
      {errormsg && <ErrorMsg>{errormsg}</ErrorMsg>}
    </AutoSuggestContainer>
  )
}
export default AutoSuggestComp
