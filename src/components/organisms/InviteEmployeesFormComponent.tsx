/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { Dispatch, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg'
import QuestionsButtonsGroup from './onboarding/QuestionsButtonsGroup'
import OnboardingQuestionsThreeColumn from './onboarding/QuestionsThreeColumn'
import { RelativePosition } from '../../utils/style'
import { InviteEmployeeFormData } from '../../utils/data/inviteFormsUtils'
import styled from '@emotion/styled'
import CustomInput from '../../pages/Onboarding/Brands/InviteEmployees/components/CustomInput'
import { ReactComponent as Cross } from '../../assets/icons/cross-icon.svg'
import { ButtonsWrapper, FormContainer, FormWrapper, Title } from '../../pages/Onboarding/Brands/StyledComponents'

interface InviteEmployeesFormProps {
  error?: AxiosError
  onSubmit: (data: InviteEmployeeFormData) => void
  isSingleForm?: boolean
  backPath: string
  skipPath: string
  lastStep: boolean
  addText?: string
  skipText?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  showErrors: {
    email: boolean
  }
  requiredOneEmailError: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRequiredOneEmailError: Dispatch<any>
}

const AddBtn = styled.div`
  border-radius: 2px;
  width: 1.563rem;
  height: 1.563rem;
  background: #f5f8fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;

  svg {
    width: 15px;
    height: 15px;

    path {
      fill: #666;
    }
  }
`

const RemoveBtn = styled.div`
  position: absolute;
  bottom: 42px;
  right: -25px;
  border-radius: 2px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;

  svg {
    width: 15px;
    height: 15px;

    path {
      fill: #666;
    }
  }
`

export const InviteEmployeesFormComponent: React.FC<InviteEmployeesFormProps> = props => {
  const { register, handleSubmit, errors } = useForm<InviteEmployeeFormData>({
    defaultValues: {
      Employees: [
        {
          firstName: '',
          lastName: '',
          email: ''
        }
      ]
    }
  })
  const { error, onSubmit, isSingleForm, backPath, lastStep, showErrors, setShowErrors } = props

  const [counter, setCounter] = useState(1)
  const [fieldsArray, setFieldsArray] = useState([{ id: 1 }])

  const hideLabel = (index: number) => {
    return index !== 0
  }

  const addFields = useCallback(() => {
    fieldsArray.push({ id: counter + 1 })
    setFieldsArray(JSON.parse(JSON.stringify(fieldsArray)))
    setCounter(counter + 1)
  }, [counter, fieldsArray])

  const removeFields = useCallback(
    id => {
      const indexOfFields = fieldsArray.findIndex(item => item.id === id)
      if (indexOfFields > -1) {
        fieldsArray.splice(indexOfFields, 1)
      }
      setFieldsArray(JSON.parse(JSON.stringify(fieldsArray)))
    },
    [fieldsArray]
  )

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Title>Team Members</Title>
        {fieldsArray.map((field, index) => (
          <div css={RelativePosition} key={field.id}>
            <OnboardingQuestionsThreeColumn
              isNotRevert={true}
              firstQuestion={
                <CustomInput
                  index={index}
                  errors={errors}
                  register={register}
                  key="firstName"
                  error={error}
                  name={`Employees[${index}].FirstName`}
                  fieldName={'FirstName'}
                  setShowErrors={setShowErrors}
                  showErrors={showErrors}
                  label={'First Name'}
                  hideLabel={hideLabel(index)}
                  placeHolder={'First name'}
                />
              }
              secondQuestion={
                <CustomInput
                  index={index}
                  errors={errors}
                  register={register}
                  key="LastName"
                  error={error}
                  name={`Employees[${index}].LastName`}
                  fieldName={'LastName'}
                  setShowErrors={setShowErrors}
                  showErrors={showErrors}
                  label={'Last Name'}
                  hideLabel={hideLabel(index)}
                  placeHolder={'Last name'}
                />
              }
              thirdQuestion={
                <CustomInput
                  index={index}
                  errors={errors}
                  register={register}
                  key="email"
                  error={error}
                  name={`Employees[${index}].Email`}
                  fieldName={'Email'}
                  setShowErrors={setShowErrors}
                  showErrors={showErrors}
                  label={'Email'}
                  hideLabel={hideLabel(index)}
                  placeHolder={'Email'}
                  type={'email'}
                />
              }
            />
            {fieldsArray.length > 1 && (
              <RemoveBtn onClick={() => removeFields(field.id)}>
                <Cross />
              </RemoveBtn>
            )}
          </div>
        ))}

        {!isSingleForm && (
          <AddBtn onClick={addFields}>
            <AddIcon />
          </AddBtn>
        )}
      </FormContainer>
      <ButtonsWrapper>
        <QuestionsButtonsGroup
          backPath={backPath}
          lastStep={lastStep}
          withNewSkip={true}
          skipText={'Skip for now'}
          skipPath={'finish'}
          type="threeCol"
        />
      </ButtonsWrapper>
    </FormWrapper>
  )
}
