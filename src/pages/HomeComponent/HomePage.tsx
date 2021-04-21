import styled from '@emotion/styled'
import { navigate, RouteComponentProps } from '@reach/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useStore } from 'react-redux'
import { Grid } from 'rsuite'
import variables from '../../assets/styles/variables'
import Button from '../../components/atoms/Button'
import Popup from '../../components/organisms/ProfileFrozenPopup'
import { AccountTypeKey } from '../../constants/common'
import { ACCESS_REQUEST_PENDING, COMPANY_ACCOUNT_DOWNGRADED } from '../../constants/TextResource'
import { useScreenSize } from '../../hooks/useScreenSize'
import LoaderProvider from '../../shared/context/LoaderProvider'
import NotificationBarProvider from '../../shared/context/NotificationBarProvider'
import { AuthState } from '../../store/auth'
import rfs, { convertLineHeightToCss, convertPxToAbs } from '../../utils/style'
import Header from './Header'
import SideBar from './SideBar'

const { Fonts, Colors } = variables

const BRAND_OWNER = (
  <p>
    It looks like your account is frozen. Please
    <Button className="popupurl" link onClick={() => navigate('dashboard')}>
      contact support
    </Button>
    for further assistance with unfreezing your account.
  </p>
)

const ContainerNoPad = styled(Grid)`
  padding: 0;
  width: calc(100% - 70px);

  @media only screen and (max-height: 590px), screen and (max-width: 768px) {
    width: 100%;
  }
`

const ContainerGridFluid = styled(Grid)`
  padding: 0 65px;
  max-width: 1850px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 0 2rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`

const ContentArea = styled.div`
  height: calc(100vh - 60px);
  background-color: #eff3f5;
  overflow: auto;
  overflow-x: hidden;
`

const ContentWrap = styled.div`
  display: flex;
`

const SideBarContainer = styled.div`
  // width: 4.375rem;
  min-width: 70px;
  transition: 0.5s;
  background-color: #1e3e75;
  position: relative;
  z-index: 52;
  @media only screen and (max-height: 590px), screen and (max-width: 768px) {
    position: fixed;
    height: 100vh;
    transition: 0.3s;
    &.opened {
      left: 0;
      transform: translateX(0rem);
    }
    &.closed {
      left: -10rem;
      transform: translateX(-10rem);
    }
  }
  @media only screen and (max-width: 2560px) and (min-width: 1921px) {
    width: 70px;
  }
`

const ErrorBar = styled.p`
  position: fixed;
  top: 60px;
  width: calc(100vw - 70px);
  background-color: ${Colors.Red[1]};
  color: ${Colors.Gray[25]};
  font-size: ${rfs('13px')};
  letter-spacing: 0.2px;
  line-height: ${convertLineHeightToCss(41, convertPxToAbs(Fonts.Size.Medium))};
  padding-bottom: 0.8125rem;
  padding-top: 0.75125rem;
  padding-right: 0.8rem;
  padding-left: 1.2rem;
  font-weight: ${Fonts.Weight.Bold};
  text-align: center;
  z-index: 20;

  @media (max-width: 768px) {
    width: 100vw;
  }
`

const SideBarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 51;
  &.opened {
    display: block;
  }
  &.closed {
    display: none;
  }
`

const DISTRIBUTOR_OR_DEALER = (
  <p>
    It looks like you voluntarily froze your account. Please
    <Button className="popupurl" link onClick={() => navigate('dashboard')}>
      navigate to your user profile
    </Button>
    to unfreeze so others can find you. This will restore your access to our online marketplace for trusted brands and
    verified authorized dealers.
  </p>
)

const EMPLOYEE = (
  <p>
    It looks like your account had been frozen or disabled. If this is an error please
    <Button className="popupurl" link onClick={() => navigate('dashboard')}>
      reach out
    </Button>
    to your account administrator.
  </p>
)

const CUSTOMER = (
  <p>
    It looks like you voluntarily froze your account. Please
    <Button className="popupurl" link onClick={() => navigate('dashboard')}>
      navigate to your user profile
    </Button>
    to unfreeze and restore access to our online marketplace for trusted brands and verified authorized dealers.
  </p>
)

const ACCOUNT_DISABLED = (
  <p>
    It looks like your account had been disabled. If this is an error please
    <Button className="popupurl" link onClick={() => navigate('dashboard')}>
      reach out
    </Button>
    to your account administrator.
  </p>
)

const getContentForAccountType = (type: string) => {
  switch (type) {
    case AccountTypeKey.MANUFACTURER:
    case AccountTypeKey.BRAND:
      return BRAND_OWNER
    case AccountTypeKey.DEALER:
      return DISTRIBUTOR_OR_DEALER
    case AccountTypeKey.DISTRIBUTOR:
      return DISTRIBUTOR_OR_DEALER
    case AccountTypeKey.CUSTOMER:
      return CUSTOMER
    case AccountTypeKey.EMPLOYEE:
      return EMPLOYEE
    default:
      return ''
  }
}

const HomePage: React.FC<RouteComponentProps> = ({ children }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(false)
  const [windowSize] = useState(useScreenSize())
  const store = useStore()
  // const dispatch = useDispatch()
  const auth: AuthState = store.getState()?.auth
  const token = auth?.user?.is_frozen
  const accountType = auth?.user?.initial_account_type
  const isAccountDisabled = auth?.user?.is_disabled
  const isOnboarding = auth?.user?.is_onboarding_complete

  useEffect(() => {
    setShowPopup(token ? true : false)
  }, [token])

  const handleOnSideBarToggle = () => {
    setToggleSideBar(current => !current)
  }

  const handleCloseSideBar = () => {
    setToggleSideBar(current => !current)
  }

  // const switchCompanyAccount = () => {
  //   const companies = auth?.user?.companies?.filter(company => company.id !== auth?.user?.active_company?.id)

  //   if (companies && companies.length > 0) {
  //     const nextActiveCompany = companies.find(
  //       company => company.is_active && company.status === 'active' && company.user_permission.active
  //     )
  //     if (nextActiveCompany) {
  //       dispatch(switchAccountCompany(nextActiveCompany))
  //       return true
  //     }
  //   }

  //   return false
  // }

  const errorMessage = useMemo(() => {
    let errorMsg = ''

    // if (!auth?.user?.active_company?.user_permission?.active) {
    //   const isSwitched = switchCompanyAccount()
    //   if (!isSwitched) errorMsg = NOT_HAVE_ACCESS_TO_COMPANY_ACCOUNT
    // }

    if (accountType === 'employee') {
      if (auth?.user?.email_confirmed) {
        if (!auth?.user?.active_company) errorMsg = ACCESS_REQUEST_PENDING
        else if (!auth?.user?.active_company?.is_subscribed && !auth?.user?.active_company?.is_trial)
          errorMsg = COMPANY_ACCOUNT_DOWNGRADED
      } else {
        if (isOnboarding) {
          navigate('/dashboard/auth/confirm-deleted-employee-email')
        }
      }
    }

    return errorMsg
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountType, auth])

  if (!isOnboarding) navigate('/dashboard/onboarding')

  const sideBarToggleClassName = toggleSideBar ? 'opened' : 'closed'

  return (
    <>
      <ContentWrap data-testid="home_page">
        <SideBarContainer className={sideBarToggleClassName}>
          <SideBar open={toggleSideBar} isCollapsible={windowSize.width > 768} onSideBarClose={handleCloseSideBar} />
        </SideBarContainer>
        <SideBarOverlay
          className={sideBarToggleClassName}
          onClick={() => {
            if (toggleSideBar) setToggleSideBar(false)
          }}
        />
        <ContainerNoPad className="container-fluid" fluid>
          <Header customMenuToggleClassName={sideBarToggleClassName} OnSideBarToggle={handleOnSideBarToggle} />
          {errorMessage.length > 0 && <ErrorBar>{errorMessage}</ErrorBar>}
          <NotificationBarProvider>
            <LoaderProvider>
              <ContentArea>
                <ContainerGridFluid fluid>{children}</ContainerGridFluid>
              </ContentArea>
            </LoaderProvider>
          </NotificationBarProvider>
        </ContainerNoPad>
      </ContentWrap>

      <Popup
        show={showPopup}
        handleClose={setShowPopup}
        content={isAccountDisabled ? ACCOUNT_DISABLED : getContentForAccountType(accountType)}
      />
    </>
  )
}

export default HomePage
