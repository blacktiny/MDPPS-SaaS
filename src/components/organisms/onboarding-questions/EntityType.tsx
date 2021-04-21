import React, { FunctionComponent, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { Input as RInput } from 'rsuite'
import Select from '../../atoms/SearchableSelect'
import { FieldErrors, FieldValues, ValidationOptions } from 'react-hook-form'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray } from '../../../utils/data'

const EntityTypeSelectWrapper = styled.div`
  margin-bottom: 1.75rem;
`

const HiddenValidateInput = styled(RInput)`
  display: none;
`

interface Props {
  defaultValue: string
  placeHolder: string
  errors: FieldErrors<FieldValues>
  error: AxiosError
  onChange: (name: string, val: string, shouldValidate?: boolean) => void
  register?: (validationOptions?: ValidationOptions) => React.Ref<Element>
  required: boolean
}
const EntityType: FunctionComponent<Props> = props => {
  const mockData = [
    { text: 'Sole proprietorship', value: 'proprietor', key: 'Sole proprietorship' },
    { text: 'Partnerships', value: 'partnership', key: 'Partnerships' },
    { text: 'Corporation', value: 'corp', key: 'Corporation' },
    { text: 'S corporation', value: 's-corp', key: 'S corporation' },
    {
      text: 'Limited Liability Company (LLC)',
      value: 'limited-liability',
      key: 'Limited Liability Company (LLC)'
    },
    { text: 'Nonprofit', value: 'non-profit', key: 'Nonprofit' },
    { text: 'Not sure / Other / None', value: 'na', key: 'Not sure / Other / None' }
  ]
  const { errors, onChange, register, defaultValue, error, required, placeHolder } = props

  const [selected, setSelected] = useState(defaultValue)

  const updateEntityType = useCallback(
    (name, value, shouldValidate) => {
      setSelected(value)
      if (onChange) onChange(name, value, shouldValidate)
    },
    [onChange]
  )

  const isInvalid = !selected && errors?.entityType?.type === 'required'

  return (
    <EntityTypeSelectWrapper>
      <Select
        defaultValue={defaultValue}
        options={mockData}
        label="Entity Type"
        placeholder={placeHolder}
        name="entityType"
        searchable={true}
        errormsg={isInvalid ? 'Please specify your entity type' : ''}
        onChange={updateEntityType}
        invalid={isInvalid}
        required={required}
      />
      {extractErrorMsgFromArray(error, 'entityType')}
      {required && register && (
        <HiddenValidateInput name={'entityType'} value={defaultValue} inputRef={register({ required: true })} />
      )}
    </EntityTypeSelectWrapper>
  )
}
export default EntityType
