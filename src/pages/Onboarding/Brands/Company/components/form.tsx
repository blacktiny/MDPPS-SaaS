/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { Dispatch, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from '@reach/router'
import { AxiosError } from 'axios'
import LegalName from '../../../../../components/organisms/onboarding-questions/LegalName'
import DBA from '../../../../../components/organisms/onboarding-questions/DBA'
import TaxIdInput from '../../../../../components/organisms/onboarding-questions/TaxIdInput'
import EntityType from '../../../../../components/organisms/onboarding-questions/EntityType'
import Categories from '../../../../../components/organisms/onboarding-questions/Categories'
import Industry from '../../../../../components/organisms/onboarding-questions/Industry'
import ProductLines from '../../../../../components/organisms/onboarding-questions/ProductLines'
import Services from '../../../../../components/organisms/onboarding-questions/Services'
import Attributes from '../../../../../components/organisms/onboarding-questions/Attributes'
import UploadProfileImageModal from '../../../../../components/organisms/onboarding-questions/UploadProfileImageModal'

import QuestionsButtonsGroup from '../../../../../components/organisms/onboarding/QuestionsButtonsGroup'
import RoundAvatar from '../../../../../components/atoms/RoundAvatar'
import Checkbox from '../../../../../components/atoms/Checkbox'

import styled from '@emotion/styled'
import Dropzone, { FileProps } from 'components/atoms/Dropzone/Dropzone'
import { File } from 'components/molecules/Onboarding/ProfileImageDropzone'

import { ButtonsWrapper, FormContainer, FormWrapper, RoundAvatarWrapper, Title } from '../../StyledComponents'

const mSilhoutte = require('../../../../../assets/images/logo-mark-grey.svg')
type FormData = {
  legalName: string
  dba: string
  taxId: string
  entityType: string
  id: number
  taxType: string
  businessLicense: string
  dealerNetworkAgreement: string
  industry: string
  categories: Array<string>
  productLines: Array<string>
  services: Array<string>
  attributes: Array<string>
}

interface Props extends RouteComponentProps {
  onSubmit: (data: FormData) => void
  userType: string
  error: AxiosError
  loading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  showErrors: {
    legalName: boolean
    dba: boolean
    taxId: boolean
    entityType: boolean
  }
  dbaRequired: boolean
  setDbaRequired: (required: boolean) => void
  onChange: (key: string, data: string | string[] | FileProps) => void
  showUploadModal: boolean
  setShowUploadModal: (data: boolean) => void
  setProfileAvatar?: (file: File, image: string) => void
  updateCroppedAreaPixels?: (data: unknown) => void
  uploadImage?: (files: File[]) => void
}

const CustomRoundAvatarWrapper = styled(RoundAvatarWrapper)`
  & > div {
    max-width: 115px;
    max-height: 115px;

    > div:first-of-type {
      height: 7.5625rem;
      min-width: 7.5625rem;
      border-radius: 20px;
      width: 7.5625rem;
      border: 0.25rem solid white;

      > img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
    > div:nth-of-type(2) {
      span {
        font-size: 18px;
        font-weight: 500;
      }
    }

    .uplodicon {
      right: -0.25rem;
      bottom: -0.25rem;
    }
  }

  &.no-profile > div {
    > div:first-of-type {
      > img {
        height: 1.75rem;
        width: 3.0625rem;
        object-fit: contain;
      }
    }
  }
`
const CheckBoxWrapper = styled.div`
  .rs-checkbox-wrapper {
    transform: scale(0.7);
  }
  & > div {
    display: flex;
    justify-content: flex-end;
    margin-bottom: -20px;
  }
  p {
    padding-top: 3px;
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    color: #333333;
    text-align: left;
    line-height: normal;
  }
`
const BrandCompanyForm: React.FC<Props> = ({
  dbaRequired,
  onSubmit,
  userType,
  error,
  data,
  showErrors,
  setDbaRequired,
  onChange,
  setShowErrors,
  setShowUploadModal,
  showUploadModal,
  setProfileAvatar,
  updateCroppedAreaPixels
}) => {
  const { setValue, register, handleSubmit, errors } = useForm<FormData>({
    defaultValues: data
  })

  useEffect(() => {
    if (!dbaRequired) {
      setValue('dba', data.dba)
    }
  }, [data.dba, dbaRequired, setValue])

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Title>Company Information</Title>
        <div className="row">
          <CustomRoundAvatarWrapper className={'col-4' + (data.logo.file_cropped ? '' : ' no-profile')}>
            <RoundAvatar
              image={data.logo.file_cropped || mSilhoutte}
              alt="user profile display picture"
              onClick={() => setShowUploadModal(true)}
            />
          </CustomRoundAvatarWrapper>
          <div className="col-8">
            <CheckBoxWrapper>
              <Checkbox name={'isDBA'} checked={dbaRequired} onChange={() => setDbaRequired(!dbaRequired)}>
                <p>Legal Name is same as DBA</p>
              </Checkbox>
            </CheckBoxWrapper>
            <LegalName
              errors={errors}
              register={register}
              key="legalName"
              error={error}
              value={data.legalName}
              name={`legalName`}
              setShowErrors={setShowErrors}
              onChange={value => onChange('legalName', value)}
              showErrors={showErrors}
              label={'Legal Name'}
              placeHolder={'Your legal business name'}
              required
            />
            {!dbaRequired && (
              <DBA
                errors={errors}
                register={register}
                key="dba"
                error={error}
                value={data.dba}
                name={`dba`}
                setShowErrors={setShowErrors}
                showErrors={showErrors}
                onChange={value => onChange('dba', value)}
                label={'DBA'}
                placeHolder={'Doing Business As'}
                required
              />
            )}
            <TaxIdInput
              errors={errors}
              register={register}
              key="taxId"
              error={error}
              value={{
                taxType: data.taxType,
                taxId: data.taxId
              }}
              name={`taxId`}
              onChangeType={value => onChange('taxType', value)}
              onChangeId={value => onChange('taxId', value)}
              setShowErrors={setShowErrors}
              showErrors={showErrors}
              placeHolder={'Tax ID Number'}
              required
            />
            <Dropzone
              name={'businessLicense'}
              defaultFile={data.businessLicense}
              errors={errors}
              label={'Business License'}
              onChange={file => onChange('businessLicense', file)}
              rules={'Allowed file type: PDF, 9MB maximum size'}
              register={register}
              errorMessage={'Please upload your business license'}
              required
            />
            {userType !== 'dealer' && (
              <Dropzone
                name={'dealerNetworkAgreement'}
                defaultFile={data.dealerNetworkAgreement}
                errors={errors}
                label={'Dealer Network Agreement'}
                onChange={file => onChange('dealerNetworkAgreement', file)}
                rules={'Allowed file type: PDF, 9MB maximum size'}
                register={register}
                errorMessage={'Please upload your dealer network agreement'}
                required
              />
            )}
            <EntityType
              register={register}
              defaultValue={data.entityType}
              onChange={(_name, value) => onChange('entityType', value)}
              errors={errors}
              error={error}
              placeHolder={'Select entity type'}
              required
            />
            <Industry
              register={register}
              defaultValue={data.industry}
              onChange={(_name, value) => onChange('industry', value)}
              errors={errors}
              error={error}
              placeHolder={'Select industry'}
              required
            />
            <Categories
              register={register}
              defaultValue={data.categories}
              onChange={selected => onChange('categories', selected)}
              errors={errors}
              error={error}
              placeHolder={'Search and select'}
              required
            />
            <ProductLines
              register={register}
              defaultValue={data.productLines}
              onChange={selected => onChange('productLines', selected)}
              errors={errors}
              error={error}
              placeHolder={'Search and select'}
              required
            />
            <Services
              register={register}
              defaultValue={data.services}
              onChange={selected => onChange('services', selected)}
              errors={errors}
              error={error}
              placeHolder={'Search and select'}
              required
            />
            <Attributes
              register={register}
              defaultValue={data.attributes}
              onChange={selected => onChange('attributes', selected)}
              errors={errors}
              error={error}
              placeHolder={'Search and select'}
              required
            />
          </div>
        </div>
      </FormContainer>
      <UploadProfileImageModal
        show={showUploadModal}
        imgSrc={data.logo.file}
        handleClose={setShowUploadModal}
        cropImage={setProfileAvatar}
        updateCroppedAreaPixels={updateCroppedAreaPixels}
        logo
      />
      <ButtonsWrapper>
        <QuestionsButtonsGroup firstStep={false} backPath="personal" type="twoCol" />
      </ButtonsWrapper>
    </FormWrapper>
  )
}

export default BrandCompanyForm
