/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { Fragment } from 'react'
import styled from '@emotion/styled'

import Logo from '../../../../assets/images/logo_grayscale.svg'
import {
  FlexStart,
  boxModel,
  CenteredPageContent,
  mq
} from '../../../../utils/style'

const Header = styled.div`
  ${FlexStart}
  padding: ${boxModel('50px', true)};
  ${mq({
    justifyContent: [`center`, '', '', `start`]
  })}
`
const HeaderLogo = styled.img`
  max-width: ${boxModel('220px')};
`
const SrartContent = styled.div`
  ${CenteredPageContent}
  ${mq({
    minHeight: [` calc(100vh - 100px)`, '', '', '', `initial`]
  })}
`
const PendingApprovalTemplate: React.FC = ({ children }) => (
  <Fragment>
    <Header>
      <HeaderLogo src={Logo} alt="" />
    </Header>
    <SrartContent>{children}</SrartContent>
  </Fragment>
)
export default PendingApprovalTemplate
