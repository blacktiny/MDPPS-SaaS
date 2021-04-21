import { Input as RInput } from 'rsuite'
import styled from '@emotion/styled'
import rfs, { boxModel } from 'utils/style'
import variables from 'assets/styles/variables'
import { css } from '@emotion/core'

const { Colors } = variables

export const DisabledStyle = css`
  background-color: #f0f0f0 !important;
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
`

export const InvalidStyle = css`
  background-color: ${Colors.Gray[25]} !important;
  border: 1px solid ${Colors.Red[3]} !important;

  &:hover {
    background-color: ${Colors.Gray[25]} !important;
    border: 1px solid ${Colors.Red[3]} !important;
  }
`

export const InputStyle = css`
  background: ${Colors.Gray[50]} !important;
  border: 1px solid transparent !important;
  border-radius: 4px;
  font-size: ${rfs('12px')};
  min-height: ${boxModel('50px')};
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
  &:active,
  &.active {
    border: 1px solid ${Colors.Blue[200]} !important;
    background: ${Colors.Gray[25]} !important;
  }
`

export const BaseInput = styled(RInput)<{ disabled?: boolean; invalid?: boolean }>`
  ${InputStyle}
  ${({ disabled }) => (disabled ? DisabledStyle : null)}
  ${({ invalid }) => (invalid ? InvalidStyle : null)}
`
