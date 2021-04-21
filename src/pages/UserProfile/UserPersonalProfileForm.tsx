/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { FunctionComponent, useState, useMemo, useCallback, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import styled from '@emotion/styled'
import { ButtonWrapper, ErrorMsg } from '../../utils/style'
import CoverImageHeaderDesc from '../../components/organisms/CoverImageHeaderDesc'
import ProfileImageHeaderDesc from '../../components/organisms/ProfileImageHeaderDesc'
import Input from '../../components/atoms/Input'
import Button from '../../components/atoms/Button'
import DatePicker2 from '../../components/atoms/DatePicker'
import Email from '../../components/organisms/onboarding-questions/Email'
import PostalCode from '../../components/organisms/onboarding-questions/PostalCode'
import City from '../../components/organisms/onboarding-questions/City'
import Location from '../../components/organisms/UserProfile/Location'
import Country from '../../components/organisms/onboarding-questions/Country'
import StreetAddress from '../../components/organisms/onboarding-questions/StreetAddress'
import StreetAddress2 from '../../components/organisms/onboarding-questions/StreetAddress2'
import MobileInputCode from '../../components/organisms/onboarding-questions/PersonalPhoneInputCode'
import SelectState from 'components/organisms/onboarding-questions/SelectState'
import CustomInput from 'components/organisms/UserProfile/CustomInput'
import SocialMediaAccounts from 'components/organisms/UserProfile/SocialMediaAccounts'
import LocalizationGroup from 'components/organisms/UserProfile/LocalizationGroup'
import LabeledTextArea from '../../components/molecules/LabeledTextArea'
import { User as UserProps } from '../../shared/models/User'
import axios from '../../utils/http/client'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../store/auth'
import _ from 'lodash'
import { AxiosError } from 'axios'
import { NotificationBarContext } from '../../shared/context/NotificationBarProvider'
import { extractErrorMsgFromArray } from '../../utils/data'
import ChangeEmailPopup from 'components/organisms/onboarding-questions/ChangeEmailPopup'
import ChangePhoneNumberPopup from 'components/organisms/onboarding-questions/ChangePhoneNumberPopup'
import ForgotYourPassword from 'pages/UserProfile/ForgotYourPassword'
import UserUploadImageModal from './UserUploadImageModal'
import { addImage2Form, generateGeoPattern, hasNumber, hasUppercase } from 'utils/helpers'

interface ShowErrorProps {
  username: boolean
  first_name: boolean
  last_name: boolean
  email: boolean
  bio: boolean
  job_title: boolean
  mobile_phone_number: boolean
  office_phone_number: boolean
  country: boolean
  address: boolean
  address2: boolean
  city: boolean
  postalCode: boolean
  state: boolean
  location: boolean
  old_password: boolean
  new_password: boolean
  date_birth: boolean
  language: boolean
  currency: boolean
  timezone: boolean
}

const PersonalProfileRight = styled.div`
  position: relative;
  padding: 10.25rem 6.25rem 3rem;
  background-color: #fff;
  box-shadow: 0px 1px 10px #00000012;
  border-radius: 0.5rem;
  margin-bottom: 4rem;
  .error-wrapper {
    position: absolute;
  }
  @media only screen and (max-width: 990px) {
    padding: 10.25rem 1.875rem;
  }
`
const EditInputWrap = styled.div`
  padding-bottom: 2.375rem;
`

const EditCoverPic = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  & * {
    border-radius: 0.5rem 0.5rem 0 0;
  }
`

const EditProfileUserPic = styled.div`
  padding-bottom: 3.5rem;
`

const AboutTextareaLabel = styled.div`
  position: relative;
`

const ProfileActionButtons = styled.div`
  button {
    margin-left: 1.25rem;
    font-weight: normal;
    font-family: roboto-medium;
    padding: 0.875rem 3.5rem;

    &.rs-btn-disabled {
      color: #e1e8ed !important;
      &:hover {
        background-color: #f5f8fa !important;
      }
    }
  }
`

interface PersonalProfileFormProps {
  username: string
  first_name: string
  last_name: string
  email: string
  bio: string
  job_title: string
  mobile_phone_number: string
  office_phone_number: string
  country: string
  address1: string
  address2: string
  city: string
  zip_code: string
  state: string
  location?: string
  old_password?: string
  new_password?: string
  date_birth?: string
  language?: string
  currency?: string
  timezone?: string
}

interface Props {
  redirectToUserPersonalProfileDetails: () => void
  userData: UserProps
  toggleLoader: (value: boolean) => void
  isCustomer: boolean
}

const SectionTitle = styled.h5`
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  color: #14171a;
  line-height: 26px;
  padding-bottom: 2.375rem;
`

const Row = styled.div`
  &.child-2 {
    display: flex;
    justify-content: space-between;

    & > div {
      width: 49%;
    }
  }

  &.child-3 {
    display: flex;
    justify-content: space-between;

    & > div {
      width: 32%;
    }
  }

  &.child-3-1 {
    display: flex;
    justify-content: space-between;

    & > div {
      width: 32%;
    }
  }
`
const CharacterCountContainer = styled.div<{ isCharInLimit: boolean }>`
  position: absolute;
  right: 0;
  font-size: 0.75rem;
  top: 0.875rem;
  color: ${({ isCharInLimit }) => (!isCharInLimit ? '#98a0ac' : 'red')};
  letter-spacing: 0.22px;
`
const PostalCodeComponent = styled(PostalCode)`
  width: 100%;
`

const LineSplitter = styled.div`
  width: calc(100% + 12.5rem);
  height: 1px;
  background: #f2f2f2;
  margin: 1rem -6.25rem 3rem;
`

const UserPersonalProfileForm: FunctionComponent<Props> = props => {
  const { showNotification } = useContext(NotificationBarContext)
  const dispatch = useDispatch()
  const { redirectToUserPersonalProfileDetails, userData, toggleLoader, isCustomer } = props
  const {
    first_name,
    last_name,
    email,
    bio = '',
    job_title,
    mobile_phone_number,
    office_phone_number,
    country,
    address1,
    address2,
    city,
    zip_code,
    state,
    username,
    date_birth,
    active_address,
    profile_cover,
    profile_photo,
    geo_pattern,
    is_onboarding_complete
  } = userData

  const userPersonalProfileFormData = {
    username,
    first_name,
    last_name,
    email,
    bio,
    job_title,
    mobile_phone_number,
    office_phone_number,
    country,
    address1,
    address2,
    date_birth,
    city,
    zip_code,
    state,
    location: active_address
  }

  const {
    handleSubmit,
    errors,
    register,
    control,
    watch,
    // formState,
    setValue,
    getValues,
    unregister
  } = useForm<PersonalProfileFormProps>({
    mode: 'onChange',
    defaultValues: userPersonalProfileFormData
  })

  const [showErrors, setShowErrors] = useState<ShowErrorProps>({
    username: true,
    first_name: true,
    last_name: true,
    email: false,
    bio: true,
    job_title: true,
    mobile_phone_number: false,
    office_phone_number: false,
    country: true,
    address: true,
    address2: true,
    city: true,
    postalCode: true,
    state: true,
    location: true,
    old_password: false,
    new_password: false,
    date_birth: false,
    language: false,
    currency: false,
    timezone: false
  })

  const AllSocialAccounts = [
    {
      icon: 'twitter',
      isOpened: true,
      label: 'Twitter',
      url: '',
      value: 'twitter'
    },
    {
      icon: 'facebook',
      isOpened: false,
      label: 'Facebook',
      url: '',
      value: 'facebook'
    },
    {
      icon: 'linkedin2',
      isOpened: false,
      label: 'LinkedIn',
      url: '',
      value: 'linkedin'
    },
    {
      icon: 'instagram',
      isOpened: false,
      label: 'Instagram',
      url: '',
      value: 'instagram'
    },
    {
      icon: 'youtube',
      isOpened: false,
      label: 'YouTube',
      url: '',
      value: 'youtube'
    }
  ]

  const [coverImage, setCoverImage] = useState({
    origin: '',
    crop: ''
  })
  const [photoImage, setPhotoImage] = useState({
    origin: '',
    crop: ''
  })
  const [croppedCoverAreaPixels, setCroppedCoverAreaPixels] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })
  const [croppedPhotoAreaPixels, setCroppedPhotoAreaPixels] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })
  const [isUpdated, setIsUpdated] = useState({
    cover: false,
    photo: false
  })
  const [isGeoPattern, setIsGeoPattern] = useState(true)
  const [showUploadImageModal, setShowUploadImageModal] = useState('')
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false)
  const [showChangePhoneNumberModal, setShowChangePhoneNumberModal] = useState(false)
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState('')
  const [mobilePhoneNumberError, setMobilePhoneNumberError] = useState<boolean>(false)
  const [officePhoneNumber, setOfficePhoneNumber] = useState('')
  const [officePhoneNumberError, setOfficePhoneNumberError] = useState<boolean>(false)
  const [socialAccounts, setSocialAccounts] = useState(AllSocialAccounts)
  const [oldPasswordError, setOldPasswordError] = useState(false)

  const uploadCoverGeoPattern = useCallback(async () => {
    const { type } = generateGeoPattern()

    let form = new FormData()
    form.append('geo_pattern', type)
    form = await addImage2Form('profile_cover_crop', 'cover.png', null, form)

    axios({
      url: 'users/me',
      method: 'PATCH',
      headers: { 'Content-Type': 'images/jpeg' },
      data: form
    })
      .then(response => {
        dispatch(setUserData(response.data))
      })
      .catch(error => {
        console.log('error.response = ', error.response)
      })
  }, [dispatch])

  useEffect(() => {
    if (is_onboarding_complete) {
      if (profile_cover?.file && profile_cover?.file_cropped) {
        setCoverImage({
          origin: profile_cover.file,
          crop: profile_cover.file_cropped
        })
        setIsGeoPattern(false)
      } else {
        const { Uri } = generateGeoPattern(geo_pattern)
        if (!geo_pattern) {
          uploadCoverGeoPattern()
        }
        setIsGeoPattern(true)
        setCoverImage({
          origin: Uri,
          crop: Uri
        })
      }
    }
  }, [geo_pattern, is_onboarding_complete, profile_cover, uploadCoverGeoPattern])

  useEffect(() => {
    if (profile_photo) {
      setPhotoImage({
        origin: profile_photo.file,
        crop: profile_photo.file_cropped
      })
    }
  }, [profile_photo])

  useEffect(() => {
    const tmpSocialAccounts = JSON.parse(JSON.stringify(socialAccounts))
    const updateSocialAccounts = (type, value) => {
      const indexOfSocial = tmpSocialAccounts.findIndex(social => social.value === type)
      if (indexOfSocial >= 0) {
        tmpSocialAccounts[indexOfSocial].url = value
        tmpSocialAccounts[indexOfSocial].isOpened = true
      }
    }

    if (userData.facebook) {
      updateSocialAccounts('facebook', userData.facebook)
    }
    if (userData.twitter) {
      updateSocialAccounts('twitter', userData.twitter)
    }
    if (userData.istagram) {
      updateSocialAccounts('istagram', userData.istagram)
    }
    if (userData.linkedin) {
      updateSocialAccounts('linkedin', userData.linkedin)
    }
    if (userData.youtube) {
      updateSocialAccounts('youtube', userData.youtube)
    }

    setSocialAccounts(tmpSocialAccounts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  const updateCroppedAreaPixels = useCallback(
    (data, isCover) => {
      isCover ? setCroppedCoverAreaPixels(data) : setCroppedPhotoAreaPixels(data)
      setIsUpdated(
        isCover
          ? {
              cover: true,
              photo: isUpdated.photo
            }
          : {
              cover: isUpdated.cover,
              photo: true
            }
      )
    },
    [isUpdated]
  )

  const [apiErrors, setAPIError] = useState<AxiosError>()

  const onSubmit = useCallback(
    async ({ location, ...dataArray }: PersonalProfileFormProps) => {
      const userProfileData = {
        ...dataArray,
        office_phone_number: officePhoneNumber ? '+' + officePhoneNumber.split('+').join('') : '',
        is_onboarding_complete: true
      }
      const birthDate = dataArray.date_birth ? new Date(dataArray.date_birth) : null
      if (birthDate) {
        userProfileData['date_birth'] = `${birthDate.getFullYear()}-${birthDate.getMonth() + 1}-${birthDate.getDate()}`
      }

      // add updated social accounts value
      socialAccounts.forEach(social => {
        if (social.isOpened && social.url.length > 0) {
          userProfileData[social.value] = social.url
        }
      })

      if (dataArray.new_password.length > 0) {
        if (dataArray.old_password.length > 0) {
          axios({
            url: 'users/password',
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
              old_password: dataArray.old_password,
              password: dataArray.new_password
            })
          })
            .then(response => {
              if (response.status === 200) {
                showNotification({
                  notificationText: 'Password successfully changed',
                  notificationType: 'success'
                })
                setValue('old_password', '')
                setValue('new_password', '')
              }
            })
            .catch(error => {
              console.log('error.response = ', error.response)
              setOldPasswordError(true)
            })
        } else {
          setOldPasswordError(true)
          return
        }
      }

      if (userProfileData.old_password) delete userProfileData.old_password
      if (userProfileData.new_password) delete userProfileData.new_password

      // Make form data
      let form = new FormData()
      for (let key in userProfileData) {
        form.append(key, userProfileData[key])
      }

      if (!isCustomer) {
        form.append('active_address', location)
      }

      if (isUpdated.cover && !isGeoPattern) {
        form = await addImage2Form('profile_cover_crop', 'cover.png', coverImage.origin, form, croppedCoverAreaPixels)
      }

      if (isUpdated.photo) {
        form = await addImage2Form('profile_photo', 'photo.png', photoImage.origin, form, croppedPhotoAreaPixels)
      }

      toggleLoader(true)

      axios({
        url: 'users/me',
        method: 'PUT',
        headers: { 'Content-Type': 'images/jpeg' },
        data: form
      })
        .then(response => {
          showNotification({
            notificationText: 'Your settings were successfully saved',
            notificationType: 'success'
          })
          dispatch(setUserData(response.data))
          redirectToUserPersonalProfileDetails()
          setShowTextWasCroppedToFitTheLimitMessage(false)
        })
        .catch(error => {
          setAPIError(error)
          setShowErrors({
            username: true,
            first_name: true,
            last_name: true,
            email: true,
            bio: true,
            job_title: true,
            mobile_phone_number: false,
            office_phone_number: true,
            country: true,
            address: true,
            address2: true,
            city: true,
            postalCode: true,
            state: true,
            location: true,
            old_password: false,
            new_password: false,
            date_birth: false,
            language: false,
            currency: false,
            timezone: false
          })
          showNotification({
            notificationText: 'Your changes could not be saved, please try again',
            notificationType: 'error'
          })
        })
        .finally(() => {
          toggleLoader(false)
        })
    },
    [
      coverImage.origin,
      croppedCoverAreaPixels,
      croppedPhotoAreaPixels,
      dispatch,
      isCustomer,
      isGeoPattern,
      isUpdated.cover,
      isUpdated.photo,
      officePhoneNumber,
      photoImage.origin,
      redirectToUserPersonalProfileDetails,
      setValue,
      showNotification,
      socialAccounts,
      toggleLoader
    ]
  )

  // -----   TextArea for Bio field   ----- //
  const bioValue = watch('bio')

  const [showTextWasCroppedToFitTheLimitMessage, setShowTextWasCroppedToFitTheLimitMessage] = useState(false)

  const handelOnTextPastedToAbout = useCallback(
    (event: React.ClipboardEvent) => {
      let clipBoardValue = event.clipboardData.getData('Text')

      if (bioValue.length + clipBoardValue.length > 1024) {
        setShowTextWasCroppedToFitTheLimitMessage(true)
      } else {
        setShowTextWasCroppedToFitTheLimitMessage(false)
      }
    },
    [bioValue]
  )

  useEffect(() => {
    if (bioValue.length < 1024) {
      setShowTextWasCroppedToFitTheLimitMessage(false)
    }
  }, [bioValue])

  const TextAreaWithCounter = useMemo(() => {
    const characterMaxLimit = 1024
    const characterCount = characterMaxLimit - (bioValue ? bioValue.length : 0)
    const isCharacterMoreThenLimit = characterCount < 0
    return (
      <React.Fragment>
        <AboutTextareaLabel>
          <CharacterCountContainer isCharInLimit={isCharacterMoreThenLimit}>
            Symbols left:{characterMaxLimit - (bioValue ? bioValue.length : 0)}
          </CharacterCountContainer>
          <LabeledTextArea
            errors={errors}
            optionHeader={'About'}
            name={'bio'}
            control={control}
            maxLength={characterMaxLimit}
            handelOnTextPasted={handelOnTextPastedToAbout}
          />
        </AboutTextareaLabel>
        {showTextWasCroppedToFitTheLimitMessage && <ErrorMsg>Text was cropped to fit the limit</ErrorMsg>}
      </React.Fragment>
    )
  }, [bioValue, control, errors, handelOnTextPastedToAbout, showTextWasCroppedToFitTheLimitMessage])
  // -------------------------------------- //

  const isRequiredFieldEmpty = useCallback(() => {
    const { first_name, last_name, email, country, address1, city, zip_code, state, username } = watch()
    if (isCustomer) {
      return !first_name || !last_name || !email || !country || !address1 || !city || !zip_code || !state || !username
    } else {
      return !first_name || !last_name || !email || !username
    }
  }, [watch, isCustomer])

  useEffect(() => {
    mobile_phone_number && setMobilePhoneNumber(mobile_phone_number)
  }, [mobile_phone_number])

  useEffect(() => {
    office_phone_number && setOfficePhoneNumber(office_phone_number)
  }, [office_phone_number])

  const getOnlyPhoneNumber = (number: string) => {
    if (number && number !== '') return number.replace(/[^0-9+]+/g, '')
    return number
  }

  const isFormValueChanged = useCallback(() => {
    const { location = '', ...allCurrentValue } = watch()
    return !_.isEqual(
      {
        mobile_phone_number: getOnlyPhoneNumber(mobilePhoneNumber),
        office_phone_number: getOnlyPhoneNumber(officePhoneNumber),
        address1,
        address2,
        city,
        zip_code,
        state,
        country,
        location: location,
        ...allCurrentValue
      },
      {
        first_name,
        last_name,
        email,
        bio,
        job_title,
        mobile_phone_number,
        office_phone_number,
        country,
        address1,
        address2,
        city,
        zip_code,
        state,
        username,
        location: active_address
      }
    )
  }, [
    watch,
    mobilePhoneNumber,
    officePhoneNumber,
    first_name,
    last_name,
    email,
    bio,
    job_title,
    mobile_phone_number,
    office_phone_number,
    country,
    address1,
    address2,
    city,
    zip_code,
    state,
    username,
    active_address
  ])

  useEffect(() => {
    if (!isCustomer) {
      register({ name: 'location' }, {})
      return () => {
        unregister('location')
      }
    }
    if (isCustomer) {
      register({ name: 'country' }, { required: true })
      return () => {
        unregister('country')
      }
    }
  }, [register, unregister, isCustomer])

  const locationError = errors?.location
  const countryError = errors?.country

  const handelOnFormSubmit = useCallback(() => {}, [])

  const handelDisableButton = useCallback(() => {
    const empty = !isRequiredFieldEmpty()
    const formValue = !isFormValueChanged()

    const value = empty && formValue

    return value
  }, [isRequiredFieldEmpty, isFormValueChanged])

  const reloadGeoPattern = useCallback(() => {
    uploadCoverGeoPattern()
  }, [uploadCoverGeoPattern])

  const updatePhotoAndCoverImages = useCallback(
    (file, image, isDeleted = false) => {
      if (file) {
        if (showUploadImageModal === 'photo') {
          setPhotoImage({ origin: file ? file.preview : file, crop: image })
        } else {
          setCoverImage({ origin: file ? file.preview : file, crop: image })
          setIsGeoPattern(false)
        }
      } else {
        if (showUploadImageModal === 'photo') {
          setPhotoImage({ crop: '', origin: '' })
        } else {
          if (isDeleted) {
            setCoverImage({ origin: '', crop: '' })
            reloadGeoPattern()
          }
        }
      }
    },
    [reloadGeoPattern, showUploadImageModal]
  )

  const handlePhoneNumberChangeSuccess = useCallback(
    (code?: string, newPhoneNumber?: string) => {
      if (code && newPhoneNumber) {
        dispatch(setUserData({ mobile_phone_number: newPhoneNumber }))
      }
    },
    [dispatch]
  )

  return (
    <React.Fragment>
      <PersonalProfileRight data-testid={'UserProfile-PersonalProfileForm'}>
        <Row>
          <EditCoverPic>
            <CoverImageHeaderDesc
              image={coverImage.crop}
              onEditPhotoClicked={() => setShowUploadImageModal('cover')}
              reload={() => reloadGeoPattern()}
              isGeoPattern={isGeoPattern}
            />
          </EditCoverPic>
        </Row>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <EditProfileUserPic>
              <ProfileImageHeaderDesc
                image={photoImage.crop}
                profileName={userData?.first_name + ' ' + userData?.last_name}
                onProfilePhotoClicked={() => setShowUploadImageModal('photo')}
              />
            </EditProfileUserPic>
          </Row>
          <Row>
            <SectionTitle>Account</SectionTitle>
            <EditInputWrap>
              <Email
                setReadOnlyStyle={true}
                disabled={true}
                disableLabel={false}
                key="email"
                errors={errors}
                error={apiErrors}
                register={register}
                label="Email Address"
                placeholder="Your email address"
                onChangeEmail={() => setShowChangeEmailModal(true)}
                setShowErrors={setShowErrors}
                showErrors={showErrors}
                verified={true}
              />
            </EditInputWrap>
            <EditInputWrap>
              <MobileInputCode
                setPhoneNumber={setMobilePhoneNumber}
                setPhoneError={setMobilePhoneNumberError}
                errors={errors}
                label={'Mobile Number'}
                key="mobilePhoneNumber"
                name={'mobile_phone_number'}
                phoneError={mobilePhoneNumberError}
                phoneValue={mobilePhoneNumber}
                phoneVerified={true}
                setShowErrors={setShowErrors}
                showErrors={showErrors}
                setShowChangeModal={() => setShowChangePhoneNumberModal(true)}
              />
            </EditInputWrap>
            <EditInputWrap>
              <CustomInput
                label="Username"
                customTopRightLabel="Unique profile name on [platform name]"
                placeholder="Userid"
                fixedPlaceholder="htpps://mdpps.com/u/"
                name="username"
                type="text"
                onChange={() => {
                  setShowErrors({ ...showErrors, username: false })
                }}
                invalid={errors?.username ? true : false}
                customRef={register({
                  pattern: {
                    // eslint-disable-next-line no-useless-escape
                    value: /^[A-Za-z0-9\@\.\+\-\_]+$/,
                    message: 'Your username must contain only letters, numbers, and these special characters @ . + - _'
                  },
                  validate: value => {
                    return !value?.trim() ? 'Please enter a username' : true
                  }
                })}
                errormsg={errors?.username?.message as string}
                required
              />

              {showErrors.username && extractErrorMsgFromArray(apiErrors, 'username')}
            </EditInputWrap>
            <EditInputWrap>
              <CustomInput
                classNames="password"
                label="Current Password"
                customTopRightLabel="I forgot my current password"
                placeholder="Leave empty if you do not want to change your password"
                name="old_password"
                type="password"
                onChange={() => {
                  setShowErrors({ ...showErrors, old_password: false })
                  setOldPasswordError(false)
                }}
                invalid={oldPasswordError || errors?.old_password ? true : false}
                customRef={register({
                  validate: value => {
                    if (getValues().new_password?.length > 0 && !value) return false
                    return true
                  }
                })}
                errormsg={
                  oldPasswordError || errors?.old_password
                    ? getValues().old_password.length === 0
                      ? 'Please enter your current password.'
                      : 'The current password is incorrect.'
                    : ''
                }
                customTopRightLabelClicked={() => setShowForgotPasswordModal(true)}
              />
            </EditInputWrap>
            <EditInputWrap>
              <Input
                label="New Password"
                placeholder=""
                name="new_password"
                type="password"
                onChange={() => {
                  setShowErrors({ ...showErrors, new_password: false })
                }}
                invalid={errors?.new_password ? true : false}
                ref={register({
                  validate: value => {
                    if (!value || (value.length >= 8 && hasNumber(value) && hasUppercase(value))) return true
                    return 'Your password needs to have at least one upper case letter, a number and contain a minimum of 8 characters'
                  }
                })}
                errormsg={errors?.new_password?.type === 'validate' && (errors?.new_password?.message as string)}
              />
            </EditInputWrap>
          </Row>
          <LineSplitter />
          <Row>
            <SectionTitle>Personal Information</SectionTitle>
            <EditInputWrap>
              <Input
                label="First Name"
                placeholder="Your first name"
                name="first_name"
                type="text"
                onChange={() => {
                  setShowErrors({ ...showErrors, first_name: false })
                }}
                invalid={errors?.first_name ? true : false}
                ref={register({
                  validate: value => {
                    return !value?.trim() ? 'Please enter your first name' : true
                  }
                })}
                errormsg={errors?.first_name?.type === 'validate' && (errors?.first_name?.message as string)}
                required
              />
              {showErrors.first_name && extractErrorMsgFromArray(apiErrors, 'first_name')}
            </EditInputWrap>
            <EditInputWrap>
              <Input
                label="Last Name"
                placeholder="Your last name"
                name="last_name"
                type="text"
                onChange={() => {
                  setShowErrors({ ...showErrors, last_name: false })
                }}
                invalid={errors?.last_name ? true : false}
                ref={register({
                  validate: value => {
                    return !value?.trim() ? 'Please enter your last name' : true
                  }
                })}
                errormsg={errors?.last_name?.type === 'validate' && (errors?.last_name?.message as string)}
                required
              />
              {showErrors.last_name && extractErrorMsgFromArray(apiErrors, 'last_name')}
            </EditInputWrap>
            <Row className="child-3-1">
              <EditInputWrap>
                <DatePicker2
                  errors={errors}
                  label="Date of Birth"
                  name="date_birth"
                  defaultValue={userData.date_birth ? userData.date_birth : null}
                  register={register}
                />
              </EditInputWrap>
            </Row>
            <EditInputWrap>
              <Input
                label="Job Title"
                placeholder="Your job title"
                name="job_title"
                type="text"
                onChange={() => {
                  setShowErrors({ ...showErrors, job_title: false })
                }}
                ref={register}
              />
            </EditInputWrap>
            {isCustomer ? (
              <React.Fragment>
                {/*   AddressDetails   */}
                <Row className="child-3-1">
                  <EditInputWrap>
                    <Country
                      countryError={countryError}
                      key="country"
                      error={apiErrors}
                      errors={errors}
                      onChange={(name, val) => {
                        setValue(name, val)
                        setValue('state', '')
                      }}
                      defaultValue={getValues().country}
                      showErrorWrapper={true}
                    />
                  </EditInputWrap>
                </Row>
                <Row className="child-2">
                  <EditInputWrap>
                    <StreetAddress
                      errors={errors}
                      register={register}
                      key="address1"
                      error={apiErrors}
                      isCustomer={true}
                      setShowErrors={setShowErrors}
                      showErrors={showErrors}
                    />
                  </EditInputWrap>
                  <EditInputWrap>
                    <StreetAddress2
                      errors={errors}
                      register={register}
                      key="address2"
                      error={apiErrors}
                      isCustomer={true}
                      setShowErrors={setShowErrors}
                      showErrors={showErrors}
                    />
                  </EditInputWrap>
                </Row>
                <Row className="child-3">
                  <EditInputWrap>
                    <City
                      errors={errors}
                      register={register}
                      key="city"
                      error={apiErrors}
                      isCustomer={true}
                      setShowErrors={setShowErrors}
                      showErrors={showErrors}
                    />
                  </EditInputWrap>
                  <SelectState
                    countryId={getValues().country.match(/\d+/) ? getValues().country.match(/\d+/)[0] : ''}
                    register={register}
                    errors={errors}
                    key="state"
                    error={apiErrors}
                    isCustomer={true}
                    showErrors={showErrors}
                    onChange={setValue}
                    defaultValue={getValues().state}
                    showErrorWrapper={true}
                    required
                  />
                  <PostalCodeComponent
                    errors={errors}
                    register={register}
                    key="postal"
                    error={apiErrors}
                    isCustomer={true}
                    setShowErrors={setShowErrors}
                    showErrors={showErrors}
                  />
                </Row>
              </React.Fragment>
            ) : (
              <EditInputWrap className="edit-location">
                <Location
                  locationError={locationError}
                  companyId={userData?.active_company?.id}
                  key="location"
                  error={apiErrors}
                  errors={errors}
                  onChange={(name, value, phoneNumber) => {
                    setValue(name, value)
                    if (phoneNumber) setOfficePhoneNumber(phoneNumber)
                  }}
                  defaultValue={getValues().location}
                  showErrorWrapper={true}
                />
              </EditInputWrap>
            )}
            <EditInputWrap>
              <MobileInputCode
                register={register}
                setPhoneNumber={setOfficePhoneNumber}
                setPhoneError={setOfficePhoneNumberError}
                errors={errors}
                label={'Office Phone Number'}
                key="officePhoneNumber"
                name={'office_phone_number'}
                phoneError={officePhoneNumberError}
                phoneValue={officePhoneNumber}
                phoneVerified={false}
                setShowErrors={setShowErrors}
                showErrors={showErrors}
              />
            </EditInputWrap>
            <EditInputWrap>{TextAreaWithCounter}</EditInputWrap>
            {showErrors.bio && extractErrorMsgFromArray(apiErrors, 'bio')}
            <EditInputWrap>
              <SocialMediaAccounts data={socialAccounts} onChanged={setSocialAccounts} />
            </EditInputWrap>
          </Row>
          <LineSplitter />
          <Row style={{ marginBottom: '3rem' }}>
            <SectionTitle>Localization</SectionTitle>
            <LocalizationGroup
              errors={errors}
              register={register}
              defaultValues={{
                currency: userData.currency,
                language: userData.language,
                timezone: userData.timezone
              }}
            />
          </Row>
          <LineSplitter />
          <ProfileActionButtons css={ButtonWrapper} className="justify-content-end mb-20">
            <Button onClick={handelOnFormSubmit} disabled={handelDisableButton()} type="submit">
              Save Changes
            </Button>
          </ProfileActionButtons>
        </form>
      </PersonalProfileRight>

      <UserUploadImageModal
        show={showUploadImageModal !== ''}
        imgSrc={showUploadImageModal === 'photo' ? photoImage.origin : isGeoPattern ? '' : coverImage.origin}
        handleClose={() => {
          setShowUploadImageModal('')
          if (!coverImage.origin) reloadGeoPattern()
        }}
        cropImage={updatePhotoAndCoverImages}
        updateCroppedAreaPixels={updateCroppedAreaPixels}
        cover={showUploadImageModal !== 'photo'}
      />

      <ChangeEmailPopup
        show={showChangeEmailModal}
        handleClose={() => setShowChangeEmailModal(false)}
        isCustomer={isCustomer}
        submitOTP={() => {}}
      />
      <ChangePhoneNumberPopup
        show={showChangePhoneNumberModal}
        handleClose={() => setShowChangePhoneNumberModal(false)}
        submitOTP={handlePhoneNumberChangeSuccess}
      />
      <ForgotYourPassword
        currentUserEmailId={getValues().email}
        currentUserPhoneNumber={mobilePhoneNumber}
        show={showForgotPasswordModal}
        handleClose={setShowForgotPasswordModal}
        toggleLoader={() => {}}
      />
    </React.Fragment>
  )
}
export default UserPersonalProfileForm
