import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import FormFieldHeader from '../FormFieldHeader'
import { ErrorMsg } from '../../../utils/style'
import variables from '../../../assets/styles/variables'
import './styles.scss'
import { Loader, TagPicker } from 'rsuite'
const { Colors } = variables

interface Options {
  text: string
  value: string
  key: string
}
interface DataItemType {
  value: string
  label: React.ReactNode
  children?: Array<DataItemType>
  groupBy?: string
}
export interface Props {
  placeholder: string
  options: Options[]
  name: string
  value?: string[]
  errormsg?: string
  label?: string
  invalid?: boolean
  disabled?: boolean
  defaultValue?: string[]
  showErrorWrapper?: boolean
  loading?: boolean
  onChange?: (selected: string[]) => void
  onChangeType?: (val: string) => void
  handleChange?: (val: string) => void
  addNewOption?: (val: string) => void
  customIconClass?: string | ReactElement
  className?: string
  required?: boolean
  creatable?: boolean
}

const SelectWrapper = styled.div`
  position: relative;
  margin-bottom: 1.75rem;
`

const InvalidStyle = css`
  .multiSelect {
    border-color: ${Colors.Red[3]};
    background: ${Colors.Gray[25]};
  }
`

const SelectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SelectContainer = styled('div')<{
  invalid?: boolean
}>`
  display: flex;
  align-items: center;
  position: relative;

  ${({ invalid }) => (invalid ? InvalidStyle : null)}
`

const SearchIconWrapper = styled.div`
  position: absolute;
  width: 3.125rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;

  span {
    color: ${Colors.Blue[200]};
    font-size: 19px;
  }
`

const SelectLimit = styled.p`
  position: absolute;
  width: 170px;
  height: 20px;
  font-family: 'Roboto Regular', 'Roboto', sans-serif;
  color: #333333;
  text-align: right;
  line-height: 1.25rem;
  font-size: 0.75rem;
  z-index: 10;
  top: 0;
  right: 0;
`
const Select: React.FC<Props> = ({
  options,
  value,
  disabled,
  label,
  name,
  errormsg,
  defaultValue,
  placeholder,
  showErrorWrapper,
  loading,
  invalid,
  addNewOption,
  onChange,
  creatable = false,
  required = false
}) => {
  const convertOptions = (options: Options[]) => {
    const data = options.map(item => ({ value: item.value, label: item.text, key: item.key }))
    data.unshift({ value: '**', label: '**', key: 'suggest' })
    data.push({ value: '+', label: '+', key: 'add' })
    return data
  }
  const [val, setVal] = useState(value || [])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const tmpDefaultValue = JSON.parse(JSON.stringify(defaultValue))
    tmpDefaultValue.push('+')
    setVal(JSON.parse(JSON.stringify(tmpDefaultValue)))
  }, [defaultValue])

  useEffect(() => {
    if (val[0] === '+') setVal([])
  }, [val])

  const handleSearch = useCallback(searchKey => {
    setIsSearching(searchKey.length > 0)
  }, [])

  const handleChange = (selected: string[]) => {
    // if add new option by creatable property
    if (selected[selected.length - 1] !== '+' && selected[selected.length - 1] !== '**') {
      const indexOfLast = options.findIndex(item => item.value === selected[selected.length - 1])
      if (indexOfLast < 0 && addNewOption) {
        addNewOption(selected[selected.length - 1])
        selected.splice(indexOfLast, 1)
      }
    }

    const newVal = JSON.parse(JSON.stringify(selected))
    const addIndex = newVal.findIndex(item => item === '+')
    if (addIndex >= 0) {
      newVal.splice(addIndex, 1)
    }

    onChange(JSON.parse(JSON.stringify(newVal)))
    newVal.push('+')

    setVal(newVal)
    setIsSearching(false)
  }

  return (
    <SelectWrapper>
      <SelectHeader>
        <FormFieldHeader label={label} name={name} required={required} />
        <SelectLimit>Select up to 10 {label?.toLowerCase()}</SelectLimit>
      </SelectHeader>
      <SelectContainer invalid={invalid}>
        <SearchIconWrapper>
          <span className="icon-search" />
        </SearchIconWrapper>
        <TagPicker
          className={
            'multiSelect' +
            (val.length > 0 ? ' selected' : '') +
            (isSearching ? ' searching' : '') +
            (val.length === 11 ? ' limited' : '')
          }
          classPrefix={isSearching || val.length === 11 ? (isSearching ? 'searching' : 'limited') : 'rs-picker'}
          data={convertOptions(options)}
          renderMenuItem={label => {
            if (label === '**') return <div className="suggest">Suggested</div>
            return <div>{label}</div>
          }}
          renderValue={(value, item, selectedElement) => {
            if (val.length < 11 && selectedElement === '+') return <div className="add-more">+ Add more</div>
            else if (val.length === 11 && selectedElement === '+') return <div />
            if (Array.isArray(item)) return <div>{item[0].label}</div>
            return <div>{item.label}</div>
          }}
          placeholder={placeholder}
          block
          tagProps={{
            onClose: e => {
              e.stopPropagation()
              if (e.target) {
                setVal(val.filter(tag => tag !== e.currentTarget.previousElementSibling.textContent))
              }
            }
          }}
          disabled={disabled}
          defaultValue={defaultValue}
          value={val}
          onClean={() => setVal([])}
          onClose={() => setIsSearching(false)}
          onSearch={handleSearch}
          onChange={handleChange}
          virtualized={false}
          creatable={creatable}
        />
      </SelectContainer>
      {loading && <Loader className="loader" />}
      <div className={showErrorWrapper ? 'error-wrapper' : ''}>
        <ErrorMsg>{errormsg}</ErrorMsg>
      </div>
    </SelectWrapper>
  )
}

export default Select
