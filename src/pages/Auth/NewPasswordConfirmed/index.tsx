/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { navigate, RouteComponentProps } from '@reach/router'
import React from 'react'
import variables from '../../../assets/styles/variables'
import { LOGIN } from '../../../constants/pagesPath'
import { boxModel, mq } from '../../../utils/style'
import AuthTemplate from '../../../components/templates/AuthTemplate'
import Button from '../../../components/atoms/Button'

interface Props extends RouteComponentProps {}

const newPasswordConfirmedContentCss = css`
  background: ${variables.Colors.Gray[25]};
  box-shadow: ${variables.DropShadow.standard};
  border-radius: 5px;
  max-width: 556px;
  min-width: 300px;
  position: relative;
  width: ${boxModel('556px')};
  display: flex;
  flex-direction: column;
  ${mq({
    padding: [
      `${boxModel('30px 40px', true)}`,
      ``,
      ``,
      ``,
      `${boxModel('40px', false)}`
    ],
    maxWidth: [`300px`, `556px`]
  })}
  > div.mb-40 {
    margin-bottom: 27px;
  }
`
const MessageText = styled.div`
  ${mq({
    maxWidth: ['470px']
  })}
  p {
    margin: 0px;
  }
`

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  ${mq({
    padding: [boxModel('0px 0px 21px 0px', false)]
  })}
`
const ButtonLinkContainer = styled.div`
  margin-top: 34px;
`
const gotToSigUp = () => {
  navigate(LOGIN)
}
const NewPasswordConfirmedPage: React.FC<Props> = () => {
  return (
    <AuthTemplate
      css={css`
        div.mb-40 {
          margin-bottom: 27px;
        }
      `}
      pageHeader="Your New Password Is Confirmed"
      subtitleClassName="text-center mb-0 mt-30"
      contentCss={newPasswordConfirmedContentCss}
    >
      <ContentLayout>
        <MessageText className="text-center">
          <p>You have successfully changed your password. </p>
          <p>Please sign in again</p>
        </MessageText>
        <ButtonLinkContainer className="text-center">
          <Button
            link
            className="text-transform-none ml--4"
            onClick={gotToSigUp}
          >
            Back to Sign in
          </Button>
        </ButtonLinkContainer>
      </ContentLayout>
    </AuthTemplate>
  )
}

export default NewPasswordConfirmedPage
