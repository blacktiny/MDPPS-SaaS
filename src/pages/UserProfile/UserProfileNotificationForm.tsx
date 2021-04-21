/** @jsx jsx */
import { jsx } from '@emotion/core'
import {
  FunctionComponent,
  useCallback,
  useState,
  useEffect,
  useContext
} from 'react'
import CheckableOptions from '../../components/organisms/CheckableOptions'
import AccountActivityOptionsConfig from './AccountActivityOptionsConfig'
import MyNetworkOptionsConfig from './MyNetworkOptionsConfig'
import LatestNewsOptionConfig from './LatestNewsOptionConfig'
import { User } from '../../shared/models/User'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'
import { useForm } from 'react-hook-form'
import { ButtonWrapper } from '../../utils/style'
import Button from '../../components/atoms/Button'
import { setUserData } from '../../store/auth'
import { useDispatch } from 'react-redux'
import axios from '../../utils/http/client'
import styled from '@emotion/styled'
import LabeledToggler from '../../components/molecules/LabeledToggler'
import PhoneNumberWithCodeInput from '../../components/organisms/UserProfile/PhoneNumberWithCodeInput'
import { extractErrorMsgFromArray } from '../../utils/data'
import { NotificationBarContext } from '../../shared/context/NotificationBarProvider'
import _ from 'lodash'
import { AxiosError } from 'axios'
import classNames from 'classnames'

const ProfileCardRight = styled.div`
  padding: 3.563rem 6.25rem;
  margin: 1.438rem 0;
  background-color: #fff;
  box-shadow: 0px 1px 10px #00000012;
  border-radius: 0.25rem;
  @media only screen and (max-width: 990px) {
    padding: 3.563rem 1.875rem;
  }
`
const NotificationSwitch = styled.div`
  margin-bottom: 2.375rem;
  .rs-btn-toggle {
    background-color: #aaaaaa;
    &.rs-btn-toggle-checked {
      background-color: #3498ff;
      &:hover {
        background-color: #2589f5;
      }
    }
  }
`
const NotificationNumber = styled.div`
  margin-bottom: 2.375rem;
  .react-tel-input {
    max-width: 18.125rem;
  }
  & > div[disabled] {
    label {
      color: #14171a;
    }
    input {
      background: #f0f0f0;
      color: #d7d7d7;
      cursor: default;
      pointer-events: none;
    }
    .flag-dropdown {
      cursor: default;
      pointer-events: none;
    }
  }
`
const NotificationFormButton = styled.div`
  button {
    &:disabled {
      font-weight: normal;
      font-family: roboto-medium;
      color: #e1e8ed !important;
      &:hover {
        background-color: #f5f8fa !important;
      }
    }
  }
`

interface AccountActivityOptions {
  account_activity_new_browser_email: boolean
  account_activity_new_device_email: boolean
  account_activity_new_app_email: boolean
  account_activity_new_browser_sms: boolean
  account_activity_new_device_sms: boolean
  account_activity_new_app_sms: boolean
}

interface MyNetworksProps {
  my_network_someone_mentions_me_email: boolean
  my_network_someone_follows_me_email: boolean
  my_network_someone_replies_to_me_email: boolean
  my_network_someone_mentions_me_sms: boolean
  my_network_someone_follows_me_sms: boolean
  my_network_someone_replies_to_me_sms: boolean
}

interface MarketingProps {
  marketing_company_news_email: boolean
  marketing_weekly_email: boolean
  marketing_latest_news_email: boolean
  marketing_company_news_sms: boolean
  marketing_weekly_sms: boolean
  marketing_latest_news_sms: boolean
}

interface MobilePhoneNumberProps {
  mobile_phone_number: string
}

interface SMSNotificationProps {
  sms_notification: boolean
}

interface NotificationOptions
  extends AccountActivityOptions,
    MyNetworksProps,
    MarketingProps,
    MobilePhoneNumberProps,
    SMSNotificationProps {}

interface Props {
  toggleLoader: (value: boolean) => void
}

const UserProfileNotificationForm: FunctionComponent<Props> = props => {
  const { showNotification } = useContext(NotificationBarContext)
  const { toggleLoader } = props
  const {
    account_activity_new_browser_email,
    account_activity_new_device_email,
    account_activity_new_app_email,
    account_activity_new_browser_sms,
    account_activity_new_device_sms,
    account_activity_new_app_sms,
    my_network_someone_mentions_me_email,
    my_network_someone_follows_me_email,
    my_network_someone_replies_to_me_email,
    my_network_someone_mentions_me_sms,
    my_network_someone_follows_me_sms,
    my_network_someone_replies_to_me_sms,
    marketing_company_news_email,
    marketing_weekly_email,
    marketing_latest_news_email,
    marketing_company_news_sms,
    marketing_weekly_sms,
    marketing_latest_news_sms,
    mobile_phone_number,
    sms_notification
  } = useSelector<RootState>(({ auth }) => auth?.user) as User
  const { register, handleSubmit, setValue, watch } = useForm<
    NotificationOptions
  >({
    mode: 'onChange',
    defaultValues: {
      account_activity_new_browser_email:
        account_activity_new_browser_email || false,
      account_activity_new_device_email:
        account_activity_new_device_email || false,
      account_activity_new_app_email: account_activity_new_app_email || false,
      account_activity_new_browser_sms:
        account_activity_new_browser_sms || false,
      account_activity_new_device_sms: account_activity_new_device_sms || false,
      account_activity_new_app_sms: account_activity_new_app_sms || false,
      my_network_someone_mentions_me_email:
        my_network_someone_mentions_me_email || false,
      my_network_someone_follows_me_email:
        my_network_someone_follows_me_email || false,
      my_network_someone_replies_to_me_email:
        my_network_someone_replies_to_me_email || false,
      my_network_someone_mentions_me_sms:
        my_network_someone_mentions_me_sms || false,
      my_network_someone_follows_me_sms:
        my_network_someone_follows_me_sms || false,
      my_network_someone_replies_to_me_sms:
        my_network_someone_replies_to_me_sms || false,
      marketing_company_news_email: marketing_company_news_email || false,
      marketing_weekly_email: marketing_weekly_email || false,
      marketing_latest_news_email: marketing_latest_news_email || false,
      marketing_company_news_sms: marketing_company_news_sms || false,
      marketing_weekly_sms: marketing_weekly_sms || false,
      marketing_latest_news_sms: marketing_latest_news_sms || false,
      mobile_phone_number: mobile_phone_number || '',
      sms_notification: sms_notification
    }
  })

  const dispatch = useDispatch()

  const [SMSPhoneNumberValue, setSMSPhoneNumberValue] = useState('')
  const [disabledOptions, setDisabledOption] = useState([])
  const [SMSNotificationManagement, setSMSNotificationManagement] = useState(
    sms_notification || false
  )
  const [SMSPhoneNumberError, setSMSPhoneNumberError] = useState(false)
  const [apiResponseError, setApiResponseError] = useState<AxiosError>(null)
  const [showErrors, setShowErrors] = useState({
    sms_phone_number: true
  })

  const checkSMSPhoneNumberValidation = () => {
    if (SMSPhoneNumberError || !SMSPhoneNumberValue) {
      return true
    }
    return false
  }

  const isReadyToSubmit = () => {
    if (checkSMSPhoneNumberValidation()) {
      return true
    }
    return false
  }

  useEffect(() => {
    setSMSPhoneNumber(mobile_phone_number)
  }, [mobile_phone_number])

  useEffect(() => {
    setSMSNotificationManagement(sms_notification)
  }, [sms_notification])

  const onSubmit = (dataArray: NotificationOptions) => {
    const userProfileNotificationData = {
      ...dataArray,
      sms_notification: SMSNotificationManagement,
      mobile_phone_number: SMSPhoneNumberValue
    }
    toggleLoader(true)
    axios({
      url: 'users/me',
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(userProfileNotificationData)
    })
      .then(response => {
        showNotification({
          notificationText: 'Changes successfully saved',
          notificationType: 'success'
        })
        dispatch(setUserData(response.data))
      })
      .catch(error => {
        setApiResponseError(error)
        showNotification({
          notificationText: 'Your changes could not be saved, please try again',
          notificationType: 'error'
        })
      })
      .finally(() => {
        toggleLoader(false)
      })
  }

  const toggleSelection = useCallback(
    (inputNameArray: string[], value: boolean) => {
      setValue(
        inputNameArray.map(notificationOptions => {
          return { [notificationOptions]: value }
        })
      )
    },
    [setValue]
  )

  const setSMSPhoneNumber = (data: string) => {
    data && setSMSPhoneNumberValue(data)
  }

  useEffect(() => {
    if (SMSNotificationManagement === false) {
      const allSMSOptions = [
        ...AccountActivityOptionsConfig.allAvailableSMSOptions,
        ...MyNetworkOptionsConfig.allAvailableSMSOptions,
        ...LatestNewsOptionConfig.allAvailableSMSOptions
      ]
      toggleSelection(allSMSOptions, false)
      setDisabledOption(allSMSOptions)
    }

    if (SMSNotificationManagement === true) setDisabledOption([])
  }, [SMSNotificationManagement, toggleSelection])

  const handelToggleAll = useCallback(
    (inputNameArray: string[], value: boolean) => {
      if (SMSNotificationManagement === false) {
        const EnabledOptions = inputNameArray.filter(
          option => !disabledOptions.includes(option)
        )
        toggleSelection(EnabledOptions, value)
      } else toggleSelection(inputNameArray, value)
    },
    [disabledOptions, SMSNotificationManagement, toggleSelection]
  )

  const isFormValueChanged = useCallback(() => {
    const allcurrentValue = watch()
    return !_.isEqual(
      {
        ...allcurrentValue,
        mobile_phone_number: SMSPhoneNumberValue,
        sms_notification: SMSNotificationManagement
      },
      {
        account_activity_new_browser_email,
        account_activity_new_device_email,
        account_activity_new_app_email,
        account_activity_new_browser_sms,
        account_activity_new_device_sms,
        account_activity_new_app_sms,
        my_network_someone_mentions_me_email,
        my_network_someone_follows_me_email,
        my_network_someone_replies_to_me_email,
        my_network_someone_mentions_me_sms,
        my_network_someone_follows_me_sms,
        my_network_someone_replies_to_me_sms,
        marketing_company_news_email,
        marketing_weekly_email,
        marketing_latest_news_email,
        marketing_company_news_sms,
        marketing_weekly_sms,
        marketing_latest_news_sms,
        mobile_phone_number,
        sms_notification
      }
    )
  }, [
    watch,
    SMSPhoneNumberValue,
    SMSNotificationManagement,
    account_activity_new_browser_email,
    account_activity_new_device_email,
    account_activity_new_app_email,
    account_activity_new_browser_sms,
    account_activity_new_device_sms,
    account_activity_new_app_sms,
    my_network_someone_mentions_me_email,
    my_network_someone_follows_me_email,
    my_network_someone_replies_to_me_email,
    my_network_someone_mentions_me_sms,
    my_network_someone_follows_me_sms,
    my_network_someone_replies_to_me_sms,
    marketing_company_news_email,
    marketing_weekly_email,
    marketing_latest_news_email,
    marketing_company_news_sms,
    marketing_weekly_sms,
    marketing_latest_news_sms,
    mobile_phone_number,
    sms_notification
  ])

  let menuIconClass = classNames({
    'menu-disabled': !SMSNotificationManagement
  })

  return (
    <ProfileCardRight data-testid="UserProfile-NotificationForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <NotificationSwitch>
          <LabeledToggler
            label={'SMS Notifications Management'}
            name={'sms_notifications_management'}
            checked={SMSNotificationManagement}
            onChange={setSMSNotificationManagement}
            testId={'sms_notifications_management-toggle'}
          />
        </NotificationSwitch>
        <NotificationNumber className={menuIconClass}>
          <PhoneNumberWithCodeInput
            name="sms_phone_number"
            label="SMS Phone Number"
            key="input-phone"
            placeholder="Your phone Number"
            disabled={!SMSNotificationManagement}
            phoneValue={SMSPhoneNumberValue}
            setPhoneNumber={setSMSPhoneNumber}
            setPhoneError={setSMSPhoneNumberError}
            phoneError={SMSPhoneNumberError}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            testId={'sms_phone_number'}
          />
          {extractErrorMsgFromArray(apiResponseError, 'mobile_phone_number')}
        </NotificationNumber>
        <CheckableOptions
          toggleAllTestId="toggleall-accountActivityOptions"
          customCellClass={AccountActivityOptionsConfig.customCellClass}
          allAvailableOptions={AccountActivityOptionsConfig.allAvailableOptions}
          cellData={AccountActivityOptionsConfig.cellData}
          headers={AccountActivityOptionsConfig.header}
          optionObject={watch(AccountActivityOptionsConfig.allAvailableOptions)}
          register={register}
          showToggleAll={true}
          handelToggleAll={handelToggleAll}
          disableData={disabledOptions}
        />
        <CheckableOptions
          customCellClass={MyNetworkOptionsConfig.customCellClass}
          allAvailableOptions={MyNetworkOptionsConfig.allAvailableOptions}
          cellData={MyNetworkOptionsConfig.cellData}
          headers={MyNetworkOptionsConfig.header}
          optionObject={watch(MyNetworkOptionsConfig.allAvailableOptions)}
          register={register}
          showToggleAll={true}
          handelToggleAll={handelToggleAll}
          disableData={disabledOptions}
        />
        <CheckableOptions
          customCellClass={LatestNewsOptionConfig.customCellClass}
          allAvailableOptions={LatestNewsOptionConfig.allAvailableOptions}
          cellData={LatestNewsOptionConfig.cellData}
          headers={LatestNewsOptionConfig.header}
          optionObject={watch(LatestNewsOptionConfig.allAvailableOptions)}
          register={register}
          showToggleAll={true}
          handelToggleAll={handelToggleAll}
          disableData={disabledOptions}
        />
        <NotificationFormButton
          css={ButtonWrapper}
          className="justify-content-end mb-20"
        >
          <Button
            disabled={isReadyToSubmit() || !isFormValueChanged()}
            type="submit"
          >
            Update Settings
          </Button>
        </NotificationFormButton>
      </form>
    </ProfileCardRight>
  )
}
export default UserProfileNotificationForm
