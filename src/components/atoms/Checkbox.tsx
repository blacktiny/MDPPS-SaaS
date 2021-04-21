import React from 'react'
import styled from '@emotion/styled'
import { Checkbox as RCheckbox } from 'rsuite'
import variables from '../../assets/styles/variables'
import rfs, { mq } from '../../utils/style'
import { ErrorMsg } from '../../utils/style/styleUtils'
import { CheckboxProps } from 'rsuite/lib/Checkbox'
import { FieldElement } from 'react-hook-form'
const { Fonts, Colors } = variables

const BaseCheckbox = styled(RCheckbox)`
  border-radius: 4px;
  transition: all 0.2s ease;

  .rs-checkbox-checker {
    padding-top: 0;
    padding-bottom: 0;
    min-height: 20px;
    line-height: 15px;
    ${mq({
      paddingLeft: [`25px`, ``, `30px`]
    })}
  }
  label {
    display: inline-block;
    min-height: 20px;
    color: ${Colors.Gray[500]};
    font-size: ${rfs(Fonts.Size.XSmall)};
    letter-spacing: 0.28px;
    line-height: 1.3;
  }
  .rs-checkbox-wrapper {
    width: 20px;
    height: 20px;
    left: 0;
    top: -1px;
  }
  .rs-checkbox-inner {
    &::before {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      border: 1px solid ${Colors.Gray[100]};
      background-color: ${Colors.Gray[50]};
    }
  }
  &.rs-checkbox-checked .rs-checkbox-wrapper .rs-checkbox-inner:before {
    background-color: ${Colors.Blue[200]};
    border: none;
  }
  &.rs-checkbox-checked .rs-checkbox-wrapper .rs-checkbox-inner:after {
    border: solid #fff;
    border-width: 0 2.5px 2.5px 0;
    width: 0.375rem;
    height: 0.688rem;
    margin-top: 0.25rem;
    margin-left: 0.438rem;
  }
  &::first-letter {
    text-transform: capitalize;
  }
`
interface Props extends CheckboxProps {
  name: string
  errormsg?: string
  ref?: React.Ref<FieldElement>
}

const Checkbox: React.FC<Props> = React.forwardRef(({ name, errormsg, ...props }, ref) => {
  return (
    <>
      <BaseCheckbox {...props} name={name} id={name} inputRef={ref}>
        {props.children}
      </BaseCheckbox>
      {errormsg && <ErrorMsg>{errormsg}</ErrorMsg>}
    </>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
