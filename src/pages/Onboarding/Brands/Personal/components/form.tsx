/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { Dispatch } from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from '@reach/router'
import { AxiosError } from 'axios'
import FirstName from '../../../../../components/organisms/onboarding-questions/FirstName'
import LastName from '../../../../../components/organisms/onboarding-questions/LastName'
import PhoneInputCode from '../../../../../components/organisms/onboarding-questions/PersonalPhoneInputCode'
import ConfirmPhoneNumberPopup from '../../../../../components/organisms/onboarding-questions/ConfirmPhoneNumberPopup'
import ChangePhoneNumberPopup from 'components/organisms/onboarding-questions/ChangePhoneNumberPopup'
import UploadProfileImageModal from '../../../../../components/organisms/onboarding-questions/UploadProfileImageModal'
import { ErrorMsg } from 'utils/style'

import QuestionsButtonsGroup from '../../../../../components/organisms/onboarding/QuestionsButtonsGroup'
import RoundAvatar from '../../../../../components/atoms/RoundAvatar'
import { File } from 'components/molecules/Onboarding/ProfileImageDropzone'

import { ButtonsWrapper, FormContainer, FormWrapper, RoundAvatarWrapper, Title } from '../../StyledComponents'

type FormData = {
  FirstName: string
  LastName: string
  PhoneNumber: string
}

interface Props extends RouteComponentProps {
  onSubmit: (data: FormData) => void
  error: AxiosError
  loading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowErrors: Dispatch<any>
  data: {
    FirstName: string
    LastName: string
    PhoneNumber: string
    Crop: string
    Origin: string
  }
  showErrors: {
    FirstName: boolean
    LastName: boolean
    PhoneNumber: boolean
  }
  setPhoneNumber: (data: string) => void
  phoneValue: string
  setPhoneError: (data: boolean) => void
  phoneError: boolean
  phoneVerified?: boolean
  setShowOTPmodal: (data: boolean) => void
  setOtpSuccess: (code?: string, phoneNumber?: string) => void
  showOTPmodal: boolean
  showUploadModal: boolean
  setShowUploadModal: (data: boolean) => void
  setProfileAvatar?: (file: File, image: string) => void
  updateCroppedAreaPixels?: (data: unknown) => void
  showChangePhoneNumberModal: boolean
  setShowChangePhoneNumberModal: (show: boolean) => void
  showPhoneNumberInUseError: boolean
}

const BrandsAndProductsForm: React.FC<Props> = ({
  onSubmit,
  error,
  data,
  showErrors,
  setShowErrors,
  setPhoneNumber,
  setPhoneError,
  phoneError,
  phoneValue,
  phoneVerified,
  showOTPmodal,
  setShowOTPmodal,
  setOtpSuccess,
  setShowUploadModal,
  showUploadModal,
  setProfileAvatar,
  updateCroppedAreaPixels,
  showChangePhoneNumberModal,
  setShowChangePhoneNumberModal,
  showPhoneNumberInUseError
}) => {
  const { register, handleSubmit, errors } = useForm<FormData>({
    defaultValues: data
  })

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Title>Personal Information</Title>
        <div className="row">
          <RoundAvatarWrapper className="col-4">
            <RoundAvatar
              image={data.Crop}
              alt="user profile display picture"
              onClick={() => setShowUploadModal(true)}
            />
          </RoundAvatarWrapper>
          <div className="col-8">
            <FirstName
              errors={errors}
              register={register}
              key="firstName"
              error={error}
              name={`FirstName`}
              setShowErrors={setShowErrors}
              showErrors={showErrors}
              label={'First Name'}
              placeHolder={'First name'}
              required
            />
            <LastName
              errors={errors}
              register={register}
              key="LastName"
              error={error}
              name={`LastName`}
              setShowErrors={setShowErrors}
              showErrors={showErrors}
              label={'Last Name'}
              placeHolder={'Last name'}
              required
            />
            <PhoneInputCode
              register={!phoneVerified && register}
              setPhoneNumber={setPhoneNumber}
              setPhoneError={setPhoneError}
              errors={errors}
              key="phoneNumber"
              name={'PhoneNumber'}
              phoneError={phoneError}
              phoneValue={phoneValue}
              phoneVerified={phoneVerified}
              setShowErrors={setShowErrors}
              setShowChangeModal={() => setShowChangePhoneNumberModal(true)}
              showErrors={showErrors}
              errorExtractedMsg={'Mobile phone number is required'}
              required
            />
            {showPhoneNumberInUseError && <ErrorMsg>{'The mobile phone is already in use.'}</ErrorMsg>}
          </div>
        </div>
      </FormContainer>
      <ConfirmPhoneNumberPopup
        show={showOTPmodal}
        handleClose={setShowOTPmodal}
        phoneNumber={phoneValue}
        submitOTP={code => {
          setOtpSuccess(code)
        }}
      />
      <ChangePhoneNumberPopup
        show={showChangePhoneNumberModal}
        handleClose={setShowChangePhoneNumberModal}
        submitOTP={(code, phoneNumber) => {
          setOtpSuccess(code, phoneNumber)
        }}
      />
      <UploadProfileImageModal
        show={showUploadModal}
        imgSrc={data.Origin}
        handleClose={setShowUploadModal}
        cropImage={setProfileAvatar}
        updateCroppedAreaPixels={updateCroppedAreaPixels}
      />
      <ButtonsWrapper>
        <QuestionsButtonsGroup firstStep={false} backPath="welcome" type="twoCol" />
      </ButtonsWrapper>
    </FormWrapper>
  )
}

export default BrandsAndProductsForm
