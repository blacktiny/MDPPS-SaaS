import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import _ from 'lodash'
import qs from 'querystring'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Avatar, Button, Dropdown, Popover, Whisper } from 'rsuite'
import logoMark from '../../../../assets/images/logo-mark.svg'
import { SubMenu } from '../../../../constants/menuConfig'
import { ENGINEERING_IN_PROCESS, LOGIN, USER_PROFILE } from '../../../../constants/pagesPath'
import * as TextResource from '../../../../constants/TextResource'
import { AuthState, resetToken, resetUserData } from '../../../../store/auth'
import { resetLocation } from '../../../../store/options'
import { RootState } from '../../../../store/types'
import { clearConsole } from '../../../../utils/console/clearConsole'
import axios from '../../../../utils/http/client'
import { getStatusPendingResult, getUserItemsBasedOnRole } from '../../../../utils/Menu/MenuUtils'
import VerificationPopup from '../../VerificationPopup'
import './style.scss'
import ContainerLoader from '../../../../components/atoms/ContainerLoader'
import { User } from 'shared/models/User'
const userSilhouette = require('../../../../assets/images/default-user-pic.svg')

const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

interface MenuItemProps {
  onSelect: Function
  options: SubMenu[]
  menuDisabled?: boolean
  className?: string
  profileAvatar: string
}

const UserddIcon = styled.span`
  font-size: 1.25rem;
  color: #b6d0fd;
  padding-right: 1.563rem;
`
const ImgIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`
const StyledImgIcon = styled.img`
  width: 100%;
  height: 100%;
`

const MenuUsername = styled.div`
  font-size: 1rem;
  color: #565456;
  font-family: Roboto-Bold;
  letter-spacing: 0.28px;
`
const UserDesign = styled.div`
  font-size: 0.875rem;
  color: #959395 !important;
  letter-spacing: 0.24px;
  text-transform: capitalize;
`

const AvatarImg = styled.img`
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
`
const Badge = styled.div`
  width: 12px;
  height: 12px;
  background-color: #ff872f;
  position: absolute;
  right: 14px;
  border-radius: 50%;
`

// Custom
const PaperImg = styled.span`
  font-size: 1.5rem;
  color: #4284fc;
`

const CaretImg = styled.span`
  font-size: 0.5rem;
  margin-left: 0.3125rem;
`

const ContinueLink = styled.a`
  font-size: 0.75rem;
  color: #3469c7;
  line-height: 0.75rem;
  font-weight: 500;
`

const MenuPopover: React.FC<MenuItemProps> = props => {
  const { onSelect, options, menuDisabled, profileAvatar, ...rest } = props

  let opacityStyle = {}
  if (menuDisabled) opacityStyle = { opacity: '0.5' }
  return (
    <Popover {...rest} full key={'tests'}>
      <Dropdown.Menu
        className="user-menu-popover"
        onSelect={(eventKey: string) => onSelect(eventKey, menuDisabled)}
        style={opacityStyle}
      >
        {options.map((option: SubMenu, index: number) => {
          if (option.isHeader) return <Dropdown.Item key={option.key} divider />
          else if (option.isCustom) return <React.Fragment key={option.key}>{option.element}</React.Fragment>
          return (
            <Dropdown.Item
              panel={option.isPanel === true ? true : false}
              eventKey={option.key}
              style={{ minWidth: '258px', marginBottom: option.isSubMenu ? '0.5rem' : '' }}
              key={option.key}
              data-testid={option.key}
              className={option.id + (option.isSelected ? ' selected' : '')}
            >
              {index === 0 ? (
                <Avatar circle>
                  <AvatarImg src={profileAvatar} alt={''} />
                </Avatar>
              ) : option.iconClass ? (
                <UserddIcon className={option.iconClass} />
              ) : (
                <ImgIconContainer>
                  <StyledImgIcon src={option.iconImage} />
                </ImgIconContainer>
              )}
              {option.element ? option.element : <p>{option.label}</p>}
              {option.isSubMenu && <span className="icon-caret switch-account" />}
              {option.id === 'businessVerification' && <Badge />}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Popover>
  )
}

type UserMenuProps = {
  isOnboarding?: boolean
}

const UserMenu = ({ isOnboarding }: UserMenuProps) => {
  const { companies, profile_photo } = useSelector<RootState>(({ auth }) => auth?.user) as User
  const [imageLoading, setImageLoading] = useState(false)
  const [optionState, setOptionState] = useState<string>('mainMenu')
  const [accountName] = useState<string>('')
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [accountOptions, setAccountOptions] = useState([])

  useEffect(() => {
    const getInitialAccountOption = () => {
      if (!companies && _.isEmpty(companies)) return []
      return companies.map(company => {
        return {
          key: `company_${company.id}`,
          data: company,
          label: company.business_name,
          iconClass: 'icon-my-networks switchuser'
        }
      })
    }
    const updatedMenu = getInitialAccountOption().filter(option => option.label.includes(accountName))

    setAccountOptions(updatedMenu)
  }, [accountName, companies])

  const { email, first_name, active_company } = useSelector<RootState>(({ auth }) => auth?.user) as User

  const store = useStore()
  const auth: AuthState = store.getState()?.auth
  const token = auth?.token?.access_token
  const accountType = auth?.user?.initial_account_type
  const userDetails: SubMenu[] = getUserItemsBasedOnRole(accountType, isOnboarding)
  const dispatch = useDispatch()
  let menuDisabled = false

  if (getStatusPendingResult(accountType, active_company)) menuDisabled = true

  userDetails.unshift({
    isCustom: true,
    key: 'APPLICATION',
    element: (
      <div className="header-application-info custom-item">
        <PaperImg className="icon-paper" />
        <div className="header-application-info-text">
          <span className="text">{'Draft Application'}</span>
          <ContinueLink>
            Continue
            <CaretImg className="icon-caret" />
          </ContinueLink>
        </div>
      </div>
    )
  })
  userDetails.unshift({
    isCustom: true,
    key: 'LOCATION',
    element: (
      <div className="menu-item-location custom-item">
        <span className="icon icon-map-pin" />
        <Button>Denver, CO</Button>
      </div>
    )
  })
  if (!isOnboarding && active_company) {
    userDetails.unshift({
      id: 'switch-account',
      key: accountOptions.length > 1 ? 'LABEL_TEXT_SWITCH_ACCOUNTS' : 'LABEL_TEXT_COMPANY_PROFILE',
      label: TextResource.LABEL_TEXT_SWITCH_ACCOUNTS,
      isSubMenu: accountOptions.length > 1 ? true : false,
      iconClass: active_company?.logo?.file_cropped ? '' : 'icon-logo-blue-mdpps',
      iconImage: active_company?.logo?.file_cropped,
      isSelected: true,
      element: (
        <div className="menu-item-company-account">
          <div className="account-info">
            <p className="account-info-name">{active_company?.business_name || ''}</p>
            <p className="account-info-id">ID: {active_company?.id || ''}</p>
          </div>
        </div>
      )
    })
  }
  userDetails.unshift({
    key: 'LABEL_TEXT_USER_NAME',
    label: 'account 2',
    image: logoMark,
    element: (
      <>
        <div className="userdetails-dd">
          <MenuUsername className="menu-user-name">{first_name || email}</MenuUsername>
          <UserDesign className="user-desig">{accountType}</UserDesign>
        </div>
      </>
    )
  })

  const accountData: SubMenu[] = useMemo(() => {
    const tmpAccountData: SubMenu[] = [
      {
        key: 'LABEL_TEXT_USER_NAME',
        label: 'account 2',
        image: logoMark,
        element: (
          <>
            <div className="userdetails-dd">
              <MenuUsername className="menu-user-name">{first_name || email}</MenuUsername>
              <UserDesign className="user-desig">{accountType}</UserDesign>
            </div>
          </>
        )
      }
    ]

    accountOptions.forEach(account => {
      const isSelected = active_company?.id === account.data.id

      tmpAccountData.push({
        id: 'switch-account',
        key: 'LABEL_TEXT_COMPANY_PROFILE',
        label: TextResource.LABEL_TEXT_SWITCH_ACCOUNTS,
        iconClass: account.data.logo?.file_cropped ? '' : 'icon-logo-blue-mdpps',
        iconImage: account.data.logo?.file_cropped,
        isSelected: isSelected,
        element: (
          <div className="menu-item-company-account">
            <div className="account-info">
              <p className="account-info-name">{account.data.business_name}</p>
              <p className="account-info-id">ID: {account.data.id}</p>
            </div>
            {isSelected && (
              <div className="account-selected">
                <div className="icon-nav-check" />
              </div>
            )}
          </div>
        )
      })
    })

    return tmpAccountData
  }, [accountOptions, accountType, active_company, email, first_name])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const triggerRef: React.Ref<any> = React.createRef()

  const handleSelectMenu = (key: string, isDisabled?: boolean) => {
    if (typeof key !== 'string') return
    if (key === 'LABEL_TEXT_LOGOUT') {
      dispatch(resetUserData())
      dispatch(resetToken())
      dispatch(resetLocation())

      axios({
        method: 'POST',
        url: 'oauth/revoke_token/',
        headers,
        data: qs.stringify({
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
          token: token
        })
      })
        .then(() => {
          navigate(LOGIN)
        })
        .catch(() => {
          clearConsole()
        })
    } else if (isDisabled) {
      // To do
    } else if (key === 'LABEL_TEXT_SWITCH_ACCOUNTS') {
      setOptionState('isSubMenu')
      return
    } else if (key === 'LABEL_TEXT_YOUR_PROFILE') {
      navigate(USER_PROFILE)
    } else if (key === 'LABEL_TEXT_COMPANY_PROFILE') {
      setOptionState('mainMenu')
      // navigate(COMPANY_PROFILE)
      return
    } else if (key === 'LABEL_TEXT_APPLICATION_SETTING') {
      navigate(USER_PROFILE)
    } else if (key === 'LABEL_TEXT_SUPPORT') {
      window.location.href = 'https://mdpps.com/support'
    } else if (!isOnboarding) {
      setOptionState('mainMenu')
      navigate(ENGINEERING_IN_PROCESS)
      return
    }
    triggerRef.current.hide()
  }

  const onCloseHandler = () => {
    setOptionState('mainMenu')
  }

  const profileAvatar = profile_photo?.file_cropped || userSilhouette

  useEffect(() => {
    if (profile_photo?.file) {
      handelOnImageChange()
    }
  }, [profile_photo])

  const handelOnImageLoad = () => {
    setImageLoading(false)
  }

  const handelOnImageChange = () => {
    setImageLoading(true)
  }

  return (
    <>
      <Whisper
        className="popover-content"
        placement="bottomEnd"
        trigger="click"
        triggerRef={triggerRef}
        onClose={onCloseHandler}
        speaker={
          <MenuPopover
            onSelect={handleSelectMenu}
            options={optionState === 'mainMenu' ? userDetails : accountData}
            menuDisabled={menuDisabled}
            profileAvatar={profileAvatar}
            className={'Usermenu' + (isOnboarding ? ' onboarding' : '')}
          />
        }
      >
        <Button data-testid="userMenu">
          <Avatar circle>
            <ContainerLoader size="xs" showLoading={imageLoading} />
            <img onLoad={handelOnImageLoad} src={profileAvatar} alt="headerIcon" />
          </Avatar>
        </Button>
      </Whisper>
      <VerificationPopup show={showPopup} handleClose={setShowPopup} />
    </>
  )
}
export default UserMenu
