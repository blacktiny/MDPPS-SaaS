/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, {
  FunctionComponent,
  useMemo,
  useCallback,
  useContext,
  useState
} from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/atoms/Button'
import { ButtonWrapper } from '../../utils/style'
import Card from '../../components/atoms/Card'
import LabeledAndDescribedMultipleChoiceOptions from '../../components/organisms/LabeledAndDescribedMultipleChoiceOptions'
import {
  default as allSettings,
  Props as PrivacyAndSecurityProps
} from './PrivacyAndSecurityConfig'
import axios from '../../utils/http/client'
import { setUserData } from '../../store/auth'
import { useDispatch } from 'react-redux'
import { User } from '../../shared/models/User'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'
import styled from '@emotion/styled'
import { NotificationBarContext } from '../../shared/context/NotificationBarProvider'
import { extractErrorMsgFromArray } from '../../utils/data'
import _ from 'lodash'
import { AxiosError } from 'axios'

const PrivacyAndSecurityCardRight = styled.div`
  padding: 3.563rem 6.25rem 2.313rem;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 1px 10px #00000012;
  border-radius: 0.25rem;
  @media only screen and (max-width: 990px) {
    padding: 3.563rem 1.875rem;
  }
  p {
    font-size: 1rem;
    padding-bottom: 0.75rem;
  }
  h5 {
    font-size: 0.875rem;
    color: #0f203c;
    font-family: roboto;
    font-weight: normal;
    padding-bottom: 0.85rem;
  }
  .rs-radio-group-inline {
    display: inline-block;
    margin-left: -0.625rem;
    padding-bottom: 2.5rem;
  }
  .rs-radio {
    margin-left: 0;
    .rs-radio-wrapper {
      .rs-radio-inner {
        &::before {
          background-color: #f4f5f8;
          width: 20px;
          height: 20px;
        }
        &::after {
          background-color: #f4f5f8;
          width: 8px;
          height: 8px;
          margin-top: 6px;
          margin-left: 6px;
        }
      }
    }
    &.rs-radio-checked {
      .rs-radio-wrapper {
        .rs-radio-inner {
          &::before {
            background-color: #f4f5f8;
            border-color: #dde3e9;
          }
          &::after {
            background: #4284fc;
            border-color: #ffffff;
          }
        }
        [type='radio']:focus ~ .rs-radio-inner::before {
          box-shadow: none;
        }
      }
    }
  }
`

const PrivacyButtonWrap = styled.div`
  button {
    &.rs-btn-disabled {
      font-weight: normal;
      font-family: roboto-medium;
      color: #e1e8ed !important;
    }
    &.rs-btn-disabled:hover {
      background-color: #f5f8fa !important;
    }
  }
`

interface Props {
  toggleLoader: (value: boolean) => void
}

const UserOptionPrivacyAndSecurityForm: FunctionComponent<Props> = props => {
  const [apiError, setApiError] = useState<AxiosError>()
  const { toggleLoader } = props
  const { showNotification } = useContext(NotificationBarContext)

  const { profile_visibility, message_visibility } = useSelector<RootState>(
    ({ auth }) => auth?.user
  ) as User

  const { handleSubmit, control, watch } = useForm<PrivacyAndSecurityProps>({
    defaultValues: {
      profile_visibility: profile_visibility,
      message_visibility: message_visibility
    }
  })

  const dispatch = useDispatch()

  const formSubmit = (data: PrivacyAndSecurityProps) => {
    toggleLoader(true)
    axios({
      url: 'users/me',
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data)
    })
      .then(response => {
        showNotification({
          notificationText: 'Changes successfully saved',
          notificationType: 'success'
        })
        setApiError(null)
        dispatch(setUserData(response.data))
      })
      .catch(error => {
        setApiError(error)
        showNotification({
          notificationText: 'Your changes could not be saved, please try again',
          notificationType: 'error'
        })
      })
      .finally(() => {
        toggleLoader(false)
      })
  }

  const PrivacyAndSecuritySettings = useMemo(() => {
    return allSettings.map((setting, key) => {
      return (
        <React.Fragment key={key}>
          <LabeledAndDescribedMultipleChoiceOptions
            key={key}
            optionName={setting.optionName}
            optionHeader={setting.header}
            optionDescription={setting.description}
            control={control}
            optionValues={setting.optionValues}
          />
          {extractErrorMsgFromArray(apiError, setting.optionName)}
        </React.Fragment>
      )
    })
  }, [control, apiError])

  const isFormValueChanged = useCallback(() => {
    return !_.isEqual(watch(), { profile_visibility, message_visibility })
  }, [watch, profile_visibility, message_visibility])

  return (
    <Card>
      <PrivacyAndSecurityCardRight data-testid="UserProfile-Privacy&SecurityForm">
        <form onSubmit={handleSubmit(formSubmit)}>
          {PrivacyAndSecuritySettings}
          <PrivacyButtonWrap
            css={ButtonWrapper}
            className="justify-content-end"
          >
            <Button disabled={!isFormValueChanged()} type="submit">
              Update Settings
            </Button>
          </PrivacyButtonWrap>
        </form>
      </PrivacyAndSecurityCardRight>
    </Card>
  )
}
export default UserOptionPrivacyAndSecurityForm
