import styled from '@emotion/styled'
import { Input as RInput } from 'rsuite'
import variables from 'assets/styles/variables'

const { Colors } = variables

export const DatePickerWrapper = styled.div`
  &.invalid {
    .rs-picker-date {
      a {
        background: ${Colors.Gray[25]} !important;
        border: 1px solid ${Colors.Red[3]} !important;
        color: ${Colors.Red[3]} !important;

        .rs-picker-toggle-placeholder,
        .rs-picker-toggle-caret {
          color: ${Colors.Red[3]} !important;
        }
      }
    }
  }

  .rs-picker-date {
    width: 18.5rem;

    a {
      display: flex;
      align-items: center;
      background: ${Colors.Gray[50]} !important;
      border: 1px solid transparent;
      border-radius: 4px;
      font-size: 0.75rem;
      height: 3.125rem;
      padding: 0.625rem 1.25rem 0.625rem 3.25rem !important;
      -webkit-transition: all 0.5s ease-in-out;
      transition: all 0.5s ease-in-out;
      width: 100%;
      color: #000000;

      &:hover:not(.active) {
        background: ${Colors.Gray[100]} !important;
        border-color: transparent !important;
      }

      &.active {
        background: ${Colors.Gray[25]} !important;
      }

      .rs-picker-toggle-placeholder {
        font-weight: 400 !important;
      }
    }
  }
`

export const DatePickerLabel = styled.label`
  color: #000000;
  font-size: 0.875rem;
  font-weight: 500;
  -webkit-letter-spacing: 0.02438rem;
  -moz-letter-spacing: 0.02438rem;
  -ms-letter-spacing: 0.02438rem;
  letter-spacing: 0.02438rem;
  line-height: 1.6;
  margin-bottom: 0.375rem;
`

export const HiddenValidateInput = styled(RInput)`
  display: none;
`
