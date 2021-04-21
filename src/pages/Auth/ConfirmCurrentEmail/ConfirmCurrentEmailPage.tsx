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
import { USER_PROFILE } from '../../../constants/pagesPath'
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
  min-width: 280px;
  background-color: #f0f0f0;
  color: ${Colors.Black[0]};
  padding-bottom: ${boxModel('17px')};
  padding-top: ${boxModel('17px')};
  padding-left: ${boxModel('20px')};
  padding-right: ${boxModel('20px')};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${boxModel('30px')};
  font-weight: ${Fonts.Weight.Medium};
  text-align: center;
  img {
    margin-left: ${boxModel('10px')};
  }
`

const ConfirmCurrentEmailPage: React.FC<Props> = () => {
  const { email } = useSelector<RootState>(({ auth }) => auth?.user) as User

  return (
    <div css={authCss}>
      <AuthTemplate
        pageHeader="Your Current Email Is Re-Confirmed"
        subtitleClassName="text-center mb-0 mt-30"
        subTitle={<span css={textCenter}>You have successfully re-confirmed your current email</span>}
      >
        <EmailView>
          {email}
          <img src={CheckIcon} alt="" />
        </EmailView>
        <div className="text-center mt-10 mb-10">
          <Button link start onClick={() => navigate(USER_PROFILE)}>
            Continue to my profile
          </Button>
        </div>
      </AuthTemplate>
    </div>
  )
}

export default ConfirmCurrentEmailPage
