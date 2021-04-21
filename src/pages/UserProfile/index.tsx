import styled from '@emotion/styled'
import { navigate, RouteComponentProps } from '@reach/router'
import useAxios from 'axios-hooks'
import _ from 'lodash'
import React, { FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Breadcrumb } from 'rsuite'
import gearIcon from '../../assets/icons/gear.svg'
import { LoaderContext } from '../../shared/context/LoaderProvider'
import { NotificationBarContext } from '../../shared/context/NotificationBarProvider'
import { User } from '../../shared/models/User'
import { ENGINEERING_IN_PROCESS, OTP } from '../../constants/pagesPath'
import { AuthState, resetToken, resetUserData, setUserData } from '../../store/auth'
import { RootState } from '../../store/types'
import { clearConsole } from '../../utils/console/clearConsole'
import axios from '../../utils/http/client'
import { getStatusPendingResult } from '../../utils/Menu/MenuUtils'
import ForgotYourPassword from './ForgotYourPassword'
import UserOptionPrivacyAndSecurityForm from './UserOptionPrivacyAndSecurityForm'
import UserPersonalProfile from './UserPersonalProfile'
import UserProfileLocalizationForm from './UserProfileLocalizationForm'
import UserProfileNotificationForm from './UserProfileNotificationForm'
import UserProfileOptions from './UserProfileOptions'
import UserProfilePasswordForm from './UserProfilePasswordForm'
import { menuConfig } from 'constants/menuConfig'

interface Props extends RouteComponentProps {}

const ProfileOptionsWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`
const CustomContainer = styled.div`
  @media only screen and (min-width: 2560) {
    margin: auto;
  }
  .breadcrumb {
    padding: 0 !important;
    margin: 4.125rem 0 1.875rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    a {
      font-size: 0.875rem;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    span {
      font-size: 0.875rem;
      color: #000;
    }
    .rs-breadcrumb-separator {
      margin: 0 0.625rem;
      color: #000;
    }
    @media only screen and (max-width: 767px) {
      margin: 3.125rem 0 1.125rem 0.25rem;
    }
  }
`
const ProfileCardRightWrap = styled.div`
  flex: 1;

  @media (max-width: 480px) {
    width: calc(100% - 50px);
  }
`
const GearImg = styled.img`
  width: 0.75rem;
  margin-right: 0.625rem;
  filter: invert(40%) sepia(100%) saturate(1197%) hue-rotate(202deg) brightness(98%) contrast(102%);
`

const getComponentCodeByLocation = () => {
  const pathName = window?.location?.pathname
  if (pathName.includes('localization')) return 'location'
  if (pathName.includes('password')) return 'businessVerification'
  if (pathName.includes('notification')) return 'notification'
  if (pathName.includes('privacy-and-security')) return 'security'
  if (pathName.includes('user-profile/edit')) return 'profile-edit'
  return 'profile'
}

const navigateToComponentByOption = (option: string | number) => {
  const selected = menuConfig.settingsMenu.find(menu => menu.id === option)

  if (selected && selected.link) {
    navigate(selected.link)
  } else {
    navigate(ENGINEERING_IN_PROCESS)
  }
}

const UserProfile: FunctionComponent<Props> = () => {
  const { setShowLoader } = useContext(LoaderContext)
  const { showNotification } = useContext(NotificationBarContext)
  const selectedOption = getComponentCodeByLocation()
  const [forgotPasswordModal, toggleForgotPasswordModal] = useState(false)

  const useReduxData = useSelector<RootState>(({ auth }) => auth?.user) as User

  const [{ data: userData, error }, fetchUserData] = useAxios(
    {
      url: 'users/me',
      method: 'GET'
    },
    {
      manual: true
    }
  )

  const store = useStore()
  const auth: AuthState = store.getState()?.auth
  const accountType = auth?.user?.account_type

  useEffect(() => {
    if (getStatusPendingResult(accountType, useReduxData.active_company)) {
      // To do
    }

    if (_.isEmpty(useReduxData)) {
      fetchUserData()
    }
  }, [accountType, useReduxData, fetchUserData])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserData(userData))
  }, [userData, dispatch])

  useEffect(() => {
    if (error) {
      showNotification({
        notificationText: 'Your changes could not be saved, please try again',
        notificationType: 'error'
      })
    }
  }, [error, showNotification])

  const settingsOptions = useMemo(() => {
    return menuConfig.settingsMenu.filter(menu => menu.permission.includes(accountType))
  }, [accountType])

  const redirectOTPPage = useCallback(
    async (email: string) => {
      await navigate(OTP, {
        state: { fromPage: 'reset-password', email: email }
      })
      dispatch(resetUserData())
      dispatch(resetToken())
    },
    [dispatch]
  )

  const handelShowForgotPasswordModal = () => {
    if (!useReduxData.mobile_phone_number) {
      const form = new FormData()
      form.set('email', useReduxData.email)
      axios({ url: 'users/password-reset/', method: 'POST', data: form })
        .then(() => {
          redirectOTPPage(form.get('email').toString())
        })
        .catch(apiError => {
          clearConsole()
          showNotification({
            notificationText: `${apiError?.response?.data?.errors?.email[0] || apiError?.response?.data?.message}`,
            notificationType: 'error'
          })
        })
    } else {
      toggleForgotPasswordModal(true)
    }
  }

  const onOptionChange = useCallback((option: string | number) => {
    navigateToComponentByOption(option)
  }, [])

  const renderTheSelectedComponent = () => {
    switch (selectedOption) {
      case 'profile':
        return <UserPersonalProfile toggleLoader={setShowLoader} />
      case 'location':
        return <UserProfileLocalizationForm toggleLoader={setShowLoader} />
      case 'businessVerification':
        return (
          <UserProfilePasswordForm
            showForgotPasswordModal={handelShowForgotPasswordModal}
            toggleLoader={setShowLoader}
          />
        )
      case 'notification':
        return <UserProfileNotificationForm toggleLoader={setShowLoader} />
      case 'security':
        return <UserOptionPrivacyAndSecurityForm toggleLoader={setShowLoader} />
      case 'profile-edit':
        return <UserPersonalProfile showEdit={true} toggleLoader={setShowLoader} />
      default:
        return
    }
  }

  return (
    <React.Fragment>
      <CustomContainer className="col-xl-10 offset-xl-1">
        <Breadcrumb separator={' | '} className="breadcrumb">
          <Breadcrumb.Item href="/">
            <GearImg src={gearIcon} alt="" />
            Settings
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Profile</Breadcrumb.Item>
        </Breadcrumb>

        <ProfileOptionsWrap>
          <UserProfileOptions
            selectedOption={selectedOption}
            onOptionChange={onOptionChange}
            options={settingsOptions}
          />
          <ProfileCardRightWrap className="profile-content" data-testid="UserProfile-RightSideContainer">
            {renderTheSelectedComponent()}
          </ProfileCardRightWrap>
        </ProfileOptionsWrap>
      </CustomContainer>

      <ForgotYourPassword
        currentUserEmailId={useReduxData.email}
        currentUserPhoneNumber={useReduxData.mobile_phone_number}
        show={forgotPasswordModal}
        handleClose={toggleForgotPasswordModal}
        toggleLoader={setShowLoader}
      />
    </React.Fragment>
  )
}
export default UserProfile
