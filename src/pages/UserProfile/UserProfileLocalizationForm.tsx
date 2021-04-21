/** @jsx jsx */
import { jsx } from '@emotion/core'
import {
  useEffect,
  FunctionComponent,
  useCallback,
  useContext,
  useState
} from 'react'
import { useForm } from 'react-hook-form'
import Language from '../../components/molecules/Language'
import Currency from '../../components/molecules/Currency'
import Timezone from '../../components/molecules/Timezone'
import { ButtonWrapper } from '../../utils/style'
import Button from '../../components/atoms/Button'
import { User } from '../../shared/models/User'
import { useSelector } from 'react-redux'
import { setUserData } from '../../store/auth'
import { useDispatch } from 'react-redux'
import axios from '../../utils/http/client'
import { RootState } from '../../store/types'
import Card from '../../components/atoms/Card'
import _ from 'lodash'
import { NotificationBarContext } from '../../shared/context/NotificationBarProvider'
import styled from '@emotion/styled'
import { AxiosError } from 'axios'
import { resetLanguage } from '../../store/options'

const LocalisationRightCard = styled.div`
  position: relative;
  background-color: #fff;
  box-shadow: 0px 1px 10px #00000012;
  padding: 3.563rem 6.25rem;
  border-radius: 0.25rem;
  @media only screen and (max-width: 990px) {
    padding: 3.563rem 1.875rem;
  }
`
const LocalisationInputWrap = styled.div`
  padding-bottom: 2.375rem;
`
const LocalisationFormButton = styled.div`
  button {
    &:disabled {
      background-color: #f5f8fa !important;
      font-family: roboto-medium;
      font-weight: normal;
      color: #e1e8ed !important;
      &:hover {
        background-color: #f5f8fa !important;
      }
    }
  }
`

type FormData = {
  language: string
  timezone: string
  currency: string
}

interface Props {
  toggleLoader: (value: boolean) => void
}

const UserProfileLocalizationForm: FunctionComponent<Props> = props => {
  const [apiErrors, setApiErrors] = useState<AxiosError>()
  const { showNotification } = useContext(NotificationBarContext)
  const { toggleLoader } = props
  const { timezone, currency, language } = useSelector<RootState>(
    ({ auth }) => auth?.user
  ) as User

  const dispatch = useDispatch()

  const handelOnSubmit = (data: FormData) => {
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
        setApiErrors(null)
        dispatch(setUserData(response.data))
        dispatch(resetLanguage())
      })
      .catch(error => {
        setApiErrors(error)
        showNotification({
          notificationText: 'Your changes could not be saved, please try again',
          notificationType: 'error'
        })
      })
      .finally(() => {
        toggleLoader(false)
      })
  }

  const {
    register,
    handleSubmit,
    errors,
    formState,
    setValue,
    unregister,
    getValues,
    watch
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      timezone,
      language,
      currency
    }
  })

  useEffect(() => {
    register({ name: 'language' }, { required: true })
    register({ name: 'currency' }, { required: true })
    register({ name: 'timezone' }, { required: true })
    return () => {
      unregister(['language' /* 'currency', 'timezone' */])
    }
  }, [register, unregister])

  const isFormValueChanged = useCallback(() => {
    return !_.isEqual(watch(), { timezone, language, currency })
  }, [watch, timezone, language, currency])

  return (
    <Card>
      <LocalisationRightCard data-testid="UserProfile-LocalizationForm">
        <form onSubmit={handleSubmit(handelOnSubmit)}>
          <LocalisationInputWrap>
            <Language
              error={apiErrors}
              data-testid="language"
              defaultValue={getValues().language}
              onChange={setValue}
              errors={errors}
            />
          </LocalisationInputWrap>
          <LocalisationInputWrap>
            <Currency
              error={apiErrors}
              defaultValue={getValues().currency}
              onChange={setValue}
              errors={errors}
            />
          </LocalisationInputWrap>
          <LocalisationInputWrap>
            <Timezone
              error={apiErrors}
              defaultValue={getValues().timezone}
              onChange={setValue}
              errors={errors}
            />
          </LocalisationInputWrap>
          <LocalisationFormButton
            css={ButtonWrapper}
            className="justify-content-end mb-20"
          >
            <Button
              disabled={!formState.isValid || !isFormValueChanged()}
              type="submit"
            >
              Update Settings
            </Button>
          </LocalisationFormButton>
        </form>
      </LocalisationRightCard>
    </Card>
  )
}

export default UserProfileLocalizationForm
