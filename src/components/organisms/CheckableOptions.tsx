import React, { FunctionComponent, useState, useEffect, memo } from 'react'
import styled from '@emotion/styled'
import TabularView from '../molecules/TabularView'
import TitleWithDescription from '../molecules/TitleWithDescription'
import Button from '../atoms/Button'
import classNames from 'classnames'

const ToggleAllButtonContainer = styled.div`
  text-align: right;
  button {
    margin-bottom: 2.375rem;
    &:hover {
      text-decoration: none;
    }
    &:focus {
      text-decoration: none;
    }
  }
`
const CheckboxLabel = styled.label`
  width: 1.563rem;
  height: 1.563rem;
  display: inline-block;
  position: relative;
  &[disabled] {
    &:before {
      cursor: default;
    }
  }
  .checkbox-inner {
    cursor: pointer;
  }

  &:before {
    content: '';
    -webkit-appearance: none;
    background-color: #f4f5f8;
    border: none;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 0.313rem;
    width: 1.563rem;
    height: 1.563rem;
    border-radius: 0.25rem;
    border: 1px solid #4284fc;
  }
  &.disabled:before {
    cursor: default;
    border-color: #f0f0f0;
    background-color: #f0f0f0;
  }
  input {
    opacity: 0;
    visibility: hidden;
    width: 0;
    height: 0;
    &:checked + .checkbox-inner:after {
      content: '';
      display: block;
      position: absolute;
      top: 0.25rem;
      left: 0.563rem;
      width: 0.375rem;
      height: 0.875rem;
      border: solid #fff;
      border-width: 0 3px 3px 0;
      border-radius: 2px;
      transform: rotate(45deg);
      transition: 0.3s;
    }

    &:checked + .checkbox-inner:before {
      content: '';
      position: absolute;
      width: 1.563rem;
      height: 1.563rem;
      background-color: #4284fc;
      top: 0;
      left: 0;
      border-radius: 0.25rem;
    }
  }
`

interface BasicObjectProps {
  [key: string]: string
}
interface DataObject {
  [key: string]: BasicObjectProps
}

interface OptionProps {
  [key: string]: boolean | string
}

interface Props {
  headers: BasicObjectProps
  cellData: DataObject[]
  allAvailableOptions: string[]
  register: React.Ref<HTMLInputElement>
  handelToggleAll?: (inputNameArray: string[], value: boolean) => void
  showToggleAll?: boolean
  customCellClass?: BasicObjectProps
  optionObject?: OptionProps
  disableData?: string[]
  toggleAllTestId?: string
}

const getRowComponent = (
  data: BasicObjectProps,
  register: React.Ref<HTMLInputElement>,
  isDisabled: boolean
) => {
  const checkboxDisabledStyle = classNames({
    customcheckbox: true,
    disabled: isDisabled
  })
  switch (data.type) {
    case 'title_with_description':
      return (
        <TitleWithDescription topic={data.topic}>
          {data.subtopic}
        </TitleWithDescription>
      )
    case 'checkbox':
      return (
        <CheckboxLabel className={checkboxDisabledStyle}>
          <input
            type="checkbox"
            disabled={isDisabled}
            ref={register}
            name={data.name}
            data-testid={data.name}
          />
          <span className="checkbox-inner" />
        </CheckboxLabel>
      )
    default:
      return
  }
}

const accountActivityData = (
  data: DataObject[],
  register: React.Ref<HTMLInputElement>,
  disableData: string[]
) => {
  return data.map(cell => {
    let row = {}
    Object.keys(cell).forEach((cellKey: string) => {
      row = {
        ...row,
        [cellKey]: getRowComponent(
          cell[cellKey],
          register,
          disableData && disableData.includes(cell[cellKey].name)
        )
      }
    })
    return row
  })
}

const CheckableOptions: FunctionComponent<Props> = props => {
  const {
    register,
    handelToggleAll,
    showToggleAll,
    headers,
    cellData,
    allAvailableOptions,
    customCellClass,
    optionObject,
    disableData,
    toggleAllTestId
  } = props

  const [toggleAll, setToggleAll] = useState(false)

  const handelToggleAllAccountActivityOptions = () => {
    handelToggleAll(allAvailableOptions, !toggleAll)
    setToggleAll(true)
  }

  useEffect(() => {
    const isAllOptionSelected = Object.keys(optionObject).some(
      option => optionObject[option] === false && !disableData.includes(option)
    )
    if (isAllOptionSelected && toggleAll) setToggleAll(false)
    if (!isAllOptionSelected && !toggleAll) setToggleAll(true)
  }, [optionObject, toggleAll, disableData])

  return (
    <div>
      <TabularView
        customCellClass={customCellClass}
        columHeaders={headers}
        rowData={accountActivityData(cellData, register, disableData)}
      />
      {showToggleAll && (
        <ToggleAllButtonContainer>
          <Button data-testid={toggleAllTestId} link onClick={handelToggleAllAccountActivityOptions}>
            {!toggleAll ? 'Select All' : 'Unselect All'}
          </Button>
        </ToggleAllButtonContainer>
      )}
    </div>
  )
}
export default memo(CheckableOptions)
