import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect
} from 'react'
import styled from '@emotion/styled'
import { Button } from 'rsuite'
import { openAlert } from '../../../components/organisms/Alerts'
import { extractErrorMsgFromMultiple } from '../../../utils/data'
import axios from '../../../utils/http/client'
import { User } from '../../../shared/models/User'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/types'
import { Icon } from 'rsuite'

interface Props {}

const VerifyEmailContainer = styled.div<{ show: boolean }>`
  top: ${({ show }) => (show ? '0' : '-60px')};
  background-color: hsla(38, 97%, 62%, 20%);
  height: 100%;
  position: absolute;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 2.875rem;
  transition: 0.3s;
  @media only screen and (max-width: 992px) {
    padding: 0;
  }
  span {
    margin: 0 0.875rem;
    @media only screen and (max-width: 992px) {
      margin: 0px 0.2rem;
    }
    &:first-child {
      @media only screen and (max-width: 992px) {
        font-size: 0.688rem;
      }
    }
    &:nth-child(3) {
      @media only screen and (max-width: 992px) {
        font-size: 0.688rem;
      }
    }
  }

  button {
    margin: 0 0.875rem;
    @media only screen and (max-width: 992px) {
      margin: 0px 0.2rem;
    }
  }
`
const EmailRoundIconContainer = styled.span`
  background-color: #fcb842;
  color: #fff;
  width: 2.75rem;
  display: flex;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 1.563rem;
  border: 0.25rem solid #fff;
`
const BoldTitle = styled.span`
  font-size: 0.875rem;
  font-family: roboto-bold;
  color: #14171a;
`
const DullDescription = styled.span`
  font-size: 0.875rem;
  color: #657786;
  letter-spacing: 0.39px;
`
const ResendButton = styled(Button)<{ isloading: number }>`
  background-color: ${({ isloading }) =>
    isloading ? '#f5f8fa !important' : '#4284fc'};
  color: ${({ isloading }) => (isloading ? '#7f7f7f !important' : '#fff')};
  font-size: 1rem;
  letter-spacing: 0.49px;
  width: 9.375rem;
  height: 2.25rem;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 0.25rem;
  &:focus {
    background-color: #4284fc;
    color: #fff;
  }
  @media only screen and (max-width: 992px) {
    width: auto;
    font-size: 12px;
  }
`

const VerifyEmail: FunctionComponent<Props> = () => {
  const [loader, toggleLoader] = useState<boolean>(false)
  const [showResendEmail, setShowResendEmail] = useState(true)
  const [sentEmail, setSentEmail] = useState<boolean>(false)

  const useReduxData = useSelector<RootState>(({ auth }) => auth?.user) as User

  useEffect(() => {
    if (sentEmail) {
      const closeNotify = setInterval(() => {
        setShowResendEmail(false)
      }, 2000)
      return () => clearInterval(closeNotify)
    }
  }, [sentEmail])

  const userEmail = useReduxData.email

  const handelOnResendEmail = useCallback(() => {
    toggleLoader(true)
    axios({
      url: 'users/resend/',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ email: userEmail })
    })
      .then(() => {
        setSentEmail(true)
      })
      .catch(error => {
        openAlert({
          type: 'warning',
          title: 'Unable send the email',
          description: extractErrorMsgFromMultiple(error, 'email')
        })
      })
      .finally(() => {
        toggleLoader(false)
      })
  }, [userEmail])

  const getButtonComponentValue = useCallback(() => {
    if (sentEmail) return 'Email Sent'
    if (loader) return <Icon icon="spinner" spin />
    return 'Resend Link'
  }, [sentEmail, loader])

  return (
    <VerifyEmailContainer show={showResendEmail}>
      <EmailRoundIconContainer className={'icon-icon-email'} />
      <BoldTitle>Verify Your Email</BoldTitle>
      <DullDescription>
        {` Please check ${userEmail} for a link to verify your Email`}
      </DullDescription>
      <ResendButton
        isloading={loader ? 1 : 0}
        size={'xs'}
        onClick={handelOnResendEmail}
      >
        {getButtonComponentValue()}
      </ResendButton>
    </VerifyEmailContainer>
  )
}
export default VerifyEmail
