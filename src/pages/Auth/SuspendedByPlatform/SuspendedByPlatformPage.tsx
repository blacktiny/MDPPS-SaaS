/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { RouteComponentProps, navigate } from '@reach/router'
import React from 'react'
import AuthTemplate from '../../../components/templates/AuthTemplate'
import Button from '../../../components/atoms/Button'
import { LOGIN } from '../../../constants/pagesPath'

interface Props extends RouteComponentProps {}
const textCenter = css`
  text-align: center;
`
const authCss = css`
  .mb-40 {
    margin-bottom: 30px;
  }
`
const bottomMargin = css`
  margin-bottom: 2px;
`

const SuspendedByPlatform: React.FC<Props> = () => (
  <div css={authCss}>
    <AuthTemplate
      pageHeader="Account Error"
      subtitleClassName="text-center mb-0 mt-10"
      subTitle={
        <span css={textCenter}>
          There was an error accessing your account.
          <br />
          Please contact{' '}
          <Button link onClick={() => {}} css={bottomMargin}>
            our support team
          </Button>{' '}
          for assistance.
        </span>
      }
    >
      <div className="text-center">
        <Button link onClick={() => navigate(LOGIN)}>
          Back to sign in
        </Button>
      </div>
    </AuthTemplate>
  </div>
)

export default SuspendedByPlatform
