/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { navigate, RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'

import Button from '../../../components/atoms/Button'
import { boxModel } from '../../../utils/style'
import AuthTemplate from '../../../components/templates/AuthTemplate'
import CheckIcon from '../../../assets/icons/check-cir.svg'
import variables from '../../../assets/styles/variables'
import { LOGIN } from '../../../constants/pagesPath'
import { RootState } from '../../../store/types'
import { User } from '../../../shared/models/User'

const { Fonts, Colors } = variables

interface Props extends RouteComponentProps {}
const textCenter = css`
  text-align: center;
`
const authCss = css`
  .mb-40 {
    margin-bottom: 30px;
    margin-top: 10px;
  }
`

const EmailView = styled.p`
  background-color: #f0f0f0;
  color: ${Colors.Black[0]};
  padding-bottom: ${boxModel('17px')};
  padding-top: ${boxModel('17px')};
  margin-left: ${boxModel('100px')};
  margin-right: ${boxModel('100px')};
  margin-bottom: ${boxModel('30px')};
  font-weight: ${Fonts.Weight.Medium};
  text-align: center;
  img {
    margin-left: ${boxModel('10px')};
  }
`

const ContentText = styled.div`
  p {
    font-weight: 400;
    font-size: 0.875rem;
    letter-spacing: 0.32px;
    line-height: 1.6;
    color: #000000;
    text-align: center;
  }

  p:last-of-type {
    margin-top: 0.25rem;
    margin-bottom: 1.5rem;
  }
`

const ConfirmNewEmailPage: React.FC<Props> = () => {
  const { email } = useSelector<RootState>(({ auth }) => auth?.user) as User

  return (
    <div css={authCss}>
      <AuthTemplate
        pageHeader="Your New Email Is Confirmed"
        subtitleClassName="text-center mb-0 mt-30"
        subTitle={<span css={textCenter}>You have successfully confirmed your new email</span>}
      >
        <EmailView>
          {email}
          <img src={CheckIcon} alt="" />
        </EmailView>
        <ContentText>
          <p>{`For security reasons we've sent a notification to the previous email address.`}</p>
          <p>{`If you don't have access to it anymore, just ignore the message.`}</p>
        </ContentText>
        <div className="text-center mt-10 mb-10">
          <Button link start onClick={() => navigate(LOGIN)}>
            Back to sign in
          </Button>
        </div>
      </AuthTemplate>
    </div>
  )
}

export default ConfirmNewEmailPage
