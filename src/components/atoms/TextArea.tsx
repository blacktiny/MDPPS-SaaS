import React, { FunctionComponent } from 'react'
import { Input } from 'rsuite'
import { Controller, Control, FieldErrors, FieldValues } from 'react-hook-form'
import 'rsuite/dist/styles/rsuite-default.css'
import { ErrorMsg } from '../../utils/style'
import styled from '@emotion/styled'

const AboutTextArea = styled.div`
  padding-top: 0.625rem;
  textarea {
    background-color: #f5f8fa;
    border: none;
    border-radius: 0.313rem;
    min-height: 9.375rem;
    resize: none !important;
    color: #000000;
    font-size: 12px;
  }
`
export interface Props {
  row?: number
  width?: number
  placeholder?: string
  name: string
  errors: FieldErrors<FieldValues>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<Record<string, any>>
  required?: boolean
  maxLength?: number
  handelOnTextPasted?: (event: React.ClipboardEvent) => void
}

const TextArea: FunctionComponent<Props> = props => {
  const {
    row = 3,
    width = '100%',
    placeholder = '',
    name,
    control,
    errors,
    required = false,
    maxLength = '',
    handelOnTextPasted
  } = props

  const handelOnPaste = (event: React.ClipboardEvent) => {
    if (event) handelOnTextPasted(event)
  }

  return (
    <React.Fragment>
      <AboutTextArea>
        <Controller
          as={
            <Input
              componentClass="textarea"
              onPaste={handelOnPaste}
              rows={row}
              style={{ width: width, resize: 'vertical' }}
              placeholder={placeholder}
              maxLength={maxLength}
            />
          }
          name={name}
          rules={{ required: required, maxLength: maxLength }}
          control={control}
        />
      </AboutTextArea>
      <ErrorMsg>
        {errors[name]?.type === 'required' && 'value required'}
        {errors[name]?.type === 'maxLength' && `should contain ${maxLength} character at most`}
      </ErrorMsg>
    </React.Fragment>
  )
}
export default TextArea
