import React, { Dispatch } from 'react'
import Input from '../../atoms/Input'
import { RouteComponentProps } from '@reach/router'
import { ValidationOptions, FieldErrors, FieldValues } from 'react-hook-form'
import { AxiosError } from 'axios'
import { extractErrorMsgFromArray } from '../../../utils/data'
import { RegexPatterns } from '../../../constants/common'

type FormData = {
  number_dealers: number
}

interface Props extends RouteComponentProps {
  errors: FieldErrors<FieldValues>
  register: (validationOptions?: ValidationOptions) => React.Ref<Element>
  error: AxiosError
  defaultValue?: string
  errorMessage: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  showErrors: {
    brandNumber?: boolean
    distributorNumber?: boolean
    dealerNumber: boolean
    productNumber?: boolean
    employeeNumber?: boolean
    supplierNumber?: boolean
  }
}

const DealersNumber: React.FC<Props> = ({
  errors,
  register,
  error,
  defaultValue,
  errorMessage,
  setShowErrors,
  showErrors
}) => {
  return (
    <>
      <Input
        name="number_dealers"
        id="number_dealers"
        placeholder="Number of dealers"
        label="How Many Dealers Are In Your Network?"
        defaultValue={defaultValue}
        invalid={errors?.number_dealers ? true : false}
        errormsg={
          (errors?.number_dealers?.type === 'required' && errorMessage) ||
          // 'Please enter the number of dealers in your network') ||
          (errors?.number_dealers?.type === 'pattern' &&
            'Please enter a numeric value')
        }
        ref={register({
          required: true,
          pattern: RegexPatterns.NUMBERS
        })}
        onChange={() => {
          setShowErrors({ ...showErrors, dealerNumber: false })
        }}
      />
      {error?.response?.data?.message &&
        showErrors.dealerNumber &&
        extractErrorMsgFromArray(error, 'number_dealers')}
    </>
  )
}

export default DealersNumber
