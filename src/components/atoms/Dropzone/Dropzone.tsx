import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Input as RInput } from 'rsuite'
import { RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import { FieldErrors, FieldValues, ValidationOptions } from 'react-hook-form'
import Background from '../../../assets/images/normal_drop_bg.svg'
import Button from '../Button'
import { niceBytes, formatDate } from '../../../utils/data'
import variables from '../../../assets/styles/variables'
import { ErrorMsg } from 'utils/style'

export interface FileProps {
  lastModified?: string
  name?: string
  path?: string
  preview?: string
  size?: number
  type?: string
  webkitRelativePath?: string
}

interface Props extends RouteComponentProps {
  name?: string
  rules?: string
  label?: string
  multiple?: boolean
  required?: boolean
  onChange?: (file: FileProps) => void
  defaultFile?: FileProps
  errors?: FieldErrors<FieldValues>
  register?: (validationOptions?: ValidationOptions) => React.Ref<Element>
  errorMessage?: string
}

const { Colors, Fonts } = variables

const Wrapper = styled.div`
  margin-bottom: 2rem;
`

const Label = styled.p`
  font-size: 14px;
  font-family: 'Roboto Medium', 'Roboto', sans-serif;
  font-weight: ${Fonts.Weight.Medium};
  color: #14171a;
  text-align: left;
  line-height: 20px;
`

const Rules = styled.span`
  font-family: 'Roboto Regular', 'Roboto', sans-serif;
  color: #333333;
  text-align: right;
  line-height: 20px;
  font-size: 12px;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`

const DropzoneWrapper = styled.div<{
  preview: boolean
}>`
  width: 100%;
  height: 50px;
  padding: ${props => (props.preview ? '12px 15px' : '0 50px')};
  color: #7f7f7f;
  font-size: 13px;
  font-family: 'Roboto Regular', Helvetica, Arial, sans-serif;
  font-weight: 400;
  background-image: ${props => (props.preview ? 'none' : `url(${Background})`)};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: ${props => (props.preview ? '1px solid #e1e8ed' : 'none')};
  border-radius: ${props => (props.preview ? '3px' : 0)};
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  &.invalid {
    border: 1px solid #d9001b;
    border-radius: 4px;
    background-image: none;
  }

  &:focus {
    outline: none;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: ${props => (props.preview ? 'inline-block' : 'absolute')};
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;

    .no-uploaded {
      font-size: 18px;
    }
  }

  button {
    &:focus {
      padding: 0 !important;
    }

    position: absolute;
    top: 10px;
    right: 15px;
    width: 6.25rem;
    height: 1.875rem;
    font-size: 0.8125rem;
    padding: 0;
  }
`
const Asterisk = styled.span`
  margin-left: 5px;
  color: red;
`

const IconPDF = styled.div`
  height: 25px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  border-radius: 3px;
  background-color: #4284fc;
  box-sizing: border-box;
  font-family: 'Roboto Regular', 'Roboto', sans-serif;
  color: #ffffff;
  text-align: center;
  line-height: normal;
  margin-right: 15px;
`

const PDFInfo = styled.div`
  padding-top: 2px;
`

const PreviewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

const Name = styled.div`
  width: 100%;
  max-width: 150px;
  font-family: 'Roboto Regular', 'Roboto', sans-serif;
  color: #14171a;
  text-align: left;
  line-height: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  margin-bottom: 3px;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const Date = styled.div`
  margin-right: 5px;
  font-size: 10px;
`

const Size = styled.span`
  font-size: 10px;
`

const Icons = styled.div`
  display: inline-flex;

  div:last-child {
    margin-left: 5px;
    outline: none;

    svg {
      path {
        fill: ${Colors.Blue[200]};
      }
    }
  }
`

const Icon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f8fa;
  border-radius: 2px;
  margin-left: 5px;

  span {
    font-size: 16px;
  }

  .icon-trash {
    color: ${Colors.Red[3]};
  }

  .icon-upload {
    color: ${Colors.Blue[200]};
  }
`

const HiddenValidateInput = styled(RInput)`
  display: none;
`

const Dropzone: React.FC<Props> = props => {
  const {
    errors,
    name,
    label,
    defaultFile = null,
    rules,
    multiple = false,
    onChange,
    register,
    errorMessage,
    required = false
  } = props
  const [accepted, setAccepted] = useState([])

  useEffect(() => {
    if (defaultFile) setAccepted([defaultFile])
  }, [defaultFile])

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setAccepted(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    )
  }, [])

  useEffect(() => {
    if (accepted.length > 0 && defaultFile) {
      if (onChange && accepted[0].preview !== defaultFile.preview) onChange(accepted[0] || null)
    } else if (accepted.length > 0 && !defaultFile) {
      if (onChange) onChange(accepted[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accepted])

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: multiple, accept: '.pdf' })

  const renderPreview = () => {
    if (accepted.length) {
      // eslint-disable-next-line prefer-destructuring
      const { name, lastModified = '', size = 0 } = accepted[0]
      const dateModified = lastModified ? formatDate(lastModified) : ''
      const formattedSize = size ? niceBytes(size) : ''
      return (
        <PreviewWrapper>
          <Flex>
            <IconPDF>PDF</IconPDF>
            <PDFInfo>
              <Name>{name}</Name>
              <Flex>
                {dateModified && <Date>{dateModified}</Date>}
                {formattedSize && <Size>| {formattedSize}</Size>}
              </Flex>
            </PDFInfo>
          </Flex>
          <Icons>
            <Icon
              onClick={() => {
                setAccepted([])
                onChange(null)
              }}
            >
              <span className="icon-trash" />
            </Icon>
            {/* <Icon>
              <span className="icon-download" />
            </Icon> */}
            <Icon {...getRootProps()}>
              <span className="icon-upload" />
              <input {...getInputProps()} />
            </Icon>
          </Icons>
        </PreviewWrapper>
      )
    }
    return (
      <>
        <div className="icon-container">
          <span className="icon-upload no-uploaded" />
        </div>
        <input {...getInputProps()} />
        {<p>Drop your file here or browse to upload</p>}
        <Button className={'browse'}>Browse</Button>
      </>
    )
  }

  const isRequiredError = useMemo(() => {
    return accepted.length === 0 && errors[name]
  }, [accepted.length, errors, name])

  return (
    <Wrapper>
      <Top>
        {!!label && (
          <Label>
            {label}
            {required && <Asterisk>*</Asterisk>}
          </Label>
        )}
        {!!rules && <Rules>{rules}</Rules>}
      </Top>
      {accepted.length < 1 ? (
        <DropzoneWrapper className={isRequiredError ? 'invalid' : ''} preview={!!accepted.length} {...getRootProps()}>
          {renderPreview()}
        </DropzoneWrapper>
      ) : (
        <DropzoneWrapper className={isRequiredError ? 'invalid' : ''} preview={!!accepted.length}>
          {renderPreview()}
        </DropzoneWrapper>
      )}
      {isRequiredError && <ErrorMsg>{errorMessage}</ErrorMsg>}
      {required && register && (
        <HiddenValidateInput
          name={name}
          value={accepted.length > 0 ? accepted[0].preview : ''}
          inputRef={register({ required: true })}
        />
      )}
    </Wrapper>
  )
}

export default Dropzone
