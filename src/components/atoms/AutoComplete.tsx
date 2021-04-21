import React from 'react';
import { AutoComplete as RAutoComplete } from 'rsuite';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import variables from '../../assets/styles/variables';
import rfs, { boxModel, ErrorMsg } from '../../utils/style';
import FormFieldHeader from './FormFieldHeader';

const { Colors } = variables

const DisabledStyle = css`
  pointer-events: none;

  .rs-input {
    background-color: #F0F0F0;
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
`
const InvalidStyle = css`
  .rs-input {
    background-color: ${Colors.Gray[25]};
    border: 1px solid ${Colors.Red[3]} !important;
    &:hover {
      background-color: ${Colors.Gray[25]};
      border: 1px solid ${Colors.Red[3]};
    }
  }
`

const AutoCompleteContainer = styled('div')`
  
`;

const AutoCompleteComponent = styled(RAutoComplete)<{ disabled?: boolean; invalid?: string }>`
  .rs-input {
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
      border: 1px solid ${Colors.Blue[200]};
      background: ${Colors.Gray[25]};
    }
  }

  ${({ disabled }) => (disabled ? DisabledStyle : null)}
  ${({ invalid }) => (invalid === 'true' ? InvalidStyle : null)}
`;

interface ItemDataType {
  label: any;
  value: any;
  groupBy?: string;
  parent?: ItemDataType;
  children?: ItemDataType[];
}

type AutoCompleteProps = {
  data: any[];
  value: string;
  defaultValue?: string;
  disabled?: boolean;
  invalid?: boolean;
  onSelect?: (item: ItemDataType, event: React.SyntheticEvent<HTMLElement>) => void;
  onChange: (value: string, event: React.SyntheticEvent) => void;
  onFocus?: (event: React.SyntheticEvent) => void;
  onBlur?: (event: React.SyntheticEvent) => void;
  onEntered?: () => void;
  onExited?: () => void;
  errormsg?: string;
  name?: string;
  label?: string;
  labelHelpText?: string;
  required?: boolean;
  dataTestid?: string;
  placeholder?: React.ReactNode;
};

const AutoComplete = ({
  data,
  value,
  defaultValue,
  disabled,
  invalid,
  label,
  name,
  required,
  labelHelpText,
  dataTestid,
  onChange,
  onFocus,
  onBlur,
  onEntered,
  onExited,
  onSelect,
  errormsg,
  placeholder,
}: AutoCompleteProps) => {
  return (
    <AutoCompleteContainer>
      {label && (
        <FormFieldHeader
          name={name}
          label={label}
          text={labelHelpText}
          required={required}
        />
      )}

      <input
        type="hidden"
        value={value}
        name={name}
        data-testid={dataTestid}
      />

      <AutoCompleteComponent
        data={data}
        value={value}
        name={name}
        disabled={disabled}
        invalid={invalid?.toString()}
        onChange={onChange}
        onEntered={onEntered}
        onFocus={onFocus}
        onBlur={onBlur}
        onExited={onExited}
        onSelect={onSelect}
        placeholder={placeholder}
        autoComplete="off"
      />

      {errormsg && (
        <ErrorMsg>{errormsg}</ErrorMsg>
      )}
    </AutoCompleteContainer>
  );
};

export default AutoComplete;
