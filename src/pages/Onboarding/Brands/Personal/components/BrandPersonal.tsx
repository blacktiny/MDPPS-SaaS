import React, { useCallback, useMemo, useState } from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import BrandsAndProductsForm from './form'
import { Loader } from '../../../../../components/atoms/Loader'
import { setUserData } from '../../../../../store/auth'
import { useDispatch, useStore } from 'react-redux'
import axios from 'utils/http/client'
import { clearConsole } from '../../../../../utils/console/clearConsole'

interface Props extends RouteComponentProps {}

interface FormDataType {
  FirstName: string
  LastName: string
  PhoneNumber: string
}

export const BrandPersonal: React.FC<Props> = () => {
  const store = useStore()

  const auth = store.getState()?.auth

  const [load] = useState(true) //, setLoad
  const [phoneValue, setphoneValue] = useState(auth?.user?.mobile_phone_number?.replace('+', '') || '')
  const [phoneError, setPhoneError] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(auth?.user?.mobile_phone_number?.length > 0)
  const [data, setData] = useState({
    Crop: auth?.user.profile_photo?.file_cropped,
    Origin: auth?.user.profile_photo?.file,
    FirstName: auth?.user.first_name || '',
    LastName: auth?.user.last_name || '',
    PhoneNumber: auth?.user.mobile_phone_number || ''
  })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showOTPmodal, setShowOTPmodal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showChangePhoneNumberModal, setShowChangePhoneNumberModal] = useState(false)
  const [showPhoneNumberInUseError, setShowPhoneNumberInUseError] = useState(false)
  const dispatch = useDispatch()

  const [showErrors, setShowErrors] = useState({
    FirstName: false,
    LastName: false,
    PhoneNumber: false
  })

  const nextStep = useMemo(() => {
    if (auth?.user.initial_account_type === 'customer') return 'address'
    return 'company'
  }, [auth])

  const updateProfileAvatar = useCallback(
    (file, image) => {
      setData({ ...data, Crop: image, Origin: file ? file.preview : file })
    },
    [data]
  )

  const updateCroppedAreaPixels = useCallback(data => {
    setCroppedAreaPixels(data)
  }, [])

  const handleOTPsuccess = (code?: string, newPhoneNumber?: string) => {
    if (code) {
      setPhoneVerified(true)
      dispatch(setUserData({ mobile_phone_number: newPhoneNumber ? newPhoneNumber : phoneValue }))
      setTimeout(() => navigate(nextStep), 2000)
    }
  }

  const isNewUpdatedField = useCallback(
    formData => {
      const isFirstName = data.FirstName && data.FirstName === formData.FirstName
      const isLastName = data.LastName && data.LastName === formData.LastName
      const isProfileAvatar = auth?.user.profile_photo?.file_cropped === data.Crop
      const isPhoneNumber = auth?.user.mobile_phone_number
        ? auth?.user.mobile_phone_number.replace('+', '') === phoneValue.replace('+', '')
        : false

      return !(isFirstName && isLastName && isProfileAvatar && isPhoneNumber)
    },
    [auth, data.Crop, data.FirstName, data.LastName, phoneValue]
  )

  const onSubmit = async (formData: FormDataType) => {
    setShowErrors({
      FirstName: false,
      LastName: false,
      PhoneNumber: false
    })

    if (phoneError) return

    // check if there is an updated field
    if (!isNewUpdatedField(formData)) {
      navigate(nextStep)
      return
    }

    const isNewPhoneNumber = auth?.user.mobile_phone_number
      ? auth?.user.mobile_phone_number.replace('+', '') !== phoneValue.replace('+', '')
      : true
    const isNewProfile = auth?.user.profile_photo?.file_cropped !== data.Crop

    const form = new FormData()
    form.append('first_name', formData.FirstName)
    form.append('last_name', formData.LastName)

    if (isNewPhoneNumber) {
      form.append('mobile_phone_number', '+' + phoneValue.replace('+', ''))
    }

    if (isNewProfile) {
      let blobOrigin = data.Origin ? await fetch(data.Origin).then(r => r.blob()) : null
      if (blobOrigin) {
        var originFile = new File([blobOrigin], 'profile.png', {
          type: 'image/png',
          lastModified: new Date().getTime()
        })
        form.append('profile_photo', originFile, 'profile.png')

        form.append('crop', JSON.stringify(croppedAreaPixels))
      } else {
        form.append('profile_photo', new File([''], ''))
        form.append('crop', null)
      }
    }

    setLoading(true)

    axios({
      url: 'users/me',
      method: 'PATCH',
      headers: { 'Content-Type': 'images/jpeg' },
      data: form
    })
      .then(res => {
        if (isNewProfile) {
          URL.revokeObjectURL(data.Crop)
          URL.revokeObjectURL(data.Origin)
        }

        dispatch(setUserData(res?.data))
      })
      .catch(err => {
        clearConsole()
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })

    if (!isNewPhoneNumber) {
      navigate(nextStep)
      return
    }

    // send OPT code to phone number
    axios({
      url: 'users/newmobile/',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: {
        new_mobile: '+' + phoneValue
      }
    })
      .then(response => {
        const { status } = response
        if (status === 200) {
          setShowOTPmodal(true)
        }
      })
      .catch(error => {
        const { data } = error.response
        if (data?.errors?.new_mobile) {
          setShowPhoneNumberInUseError(true)
          setTimeout(() => {
            setShowPhoneNumberInUseError(false)
          }, 5000)
        } else {
          clearConsole()
          setError(error)
          console.log('[API PUT /users/newmobile] error = ', error)
        }
      })
  }

  return (
    <>
      {loading && <Loader />}
      {!load && data && (
        <BrandsAndProductsForm
          data={data}
          onSubmit={onSubmit}
          error={error}
          loading={loading}
          setShowErrors={setShowErrors}
          showErrors={showErrors}
          setPhoneNumber={setphoneValue}
          setPhoneError={setPhoneError}
          phoneError={phoneError}
          phoneValue={phoneValue}
          phoneVerified={phoneVerified}
          showOTPmodal={showOTPmodal}
          setShowOTPmodal={setShowOTPmodal}
          showUploadModal={showUploadModal}
          setShowUploadModal={setShowUploadModal}
          setOtpSuccess={handleOTPsuccess}
          setProfileAvatar={updateProfileAvatar}
          updateCroppedAreaPixels={updateCroppedAreaPixels}
          showChangePhoneNumberModal={showChangePhoneNumberModal}
          setShowChangePhoneNumberModal={setShowChangePhoneNumberModal}
          showPhoneNumberInUseError={showPhoneNumberInUseError}
        />
      )}
      {load && (
        <BrandsAndProductsForm
          data={data}
          onSubmit={onSubmit}
          error={error}
          loading={loading}
          setShowErrors={setShowErrors}
          showErrors={showErrors}
          setPhoneNumber={setphoneValue}
          setPhoneError={setPhoneError}
          phoneError={phoneError}
          phoneValue={phoneValue}
          phoneVerified={phoneVerified}
          showOTPmodal={showOTPmodal}
          setShowOTPmodal={setShowOTPmodal}
          showUploadModal={showUploadModal}
          setShowUploadModal={setShowUploadModal}
          setOtpSuccess={handleOTPsuccess}
          setProfileAvatar={updateProfileAvatar}
          updateCroppedAreaPixels={updateCroppedAreaPixels}
          showChangePhoneNumberModal={showChangePhoneNumberModal}
          setShowChangePhoneNumberModal={setShowChangePhoneNumberModal}
          showPhoneNumberInUseError={showPhoneNumberInUseError}
        />
      )}
    </>
  )
}
