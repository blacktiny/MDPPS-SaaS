/** @jsx jsx */
import { jsx, css, SerializedStyles } from '@emotion/core'
import React from 'react'
import { Footer } from '../organisms/Footer'
import styled from '@emotion/styled'
import { UIHeader01, UIBody01 } from '../../assets/styles/typography'
import rfs, {
  FormBox,
  boxModel,
  convertLineHeightToCss,
  mq
} from '../../utils/style'
import Logo from '../../assets/images/mdpps_logo.svg'
import variables from '../../assets/styles/variables'

const { Fonts, Colors } = variables

const AuthTemplateLogo = styled.img`
  /* margin-bottom: ${boxModel('37.5px', true)}; */
  max-width: ${boxModel('223px')};
  ${mq({
    marginBottom: [`15px`, ``, ``, ``, `${boxModel('37.5px', true)}`]
  })}
`
const pageContent = css`
  min-height: 100vh;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const CenteredPageContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding: ${boxModel('50px 0', true)}; */
  ${mq({
    paddingBottom: [`20px`, ``, ``, ``, `${boxModel('50px', true)}`],
    paddingTop: [`20px`, ``, ``, ``, `${boxModel('50px', true)}`]
  })}
`
const AuthHint = styled.p`
  color: ${Colors.Gray[25]};
  font-size: ${rfs(Fonts.Size.XSmall)};
  letter-spacing: 0.28px;
  line-height: ${convertLineHeightToCss(22, 14)};
  margin: ${boxModel('31px 0px 19px 0px')};
  text-align: center;
  width: ${boxModel('556px')};
  padding: 0;
  ${mq({
    maxWidth: ['300px', '556px']
  })}
`
const AuthTitle = styled.h1`
  ${UIHeader01}
  color: ${Colors.Gray[500]};
`

interface Props {
  pageHeader: string
  subTitle?: JSX.Element | string
  bottomText?: string | Array<string | JSX.Element>
  titleClassName?: string
  subtitleClassName?: string
  contentCss?: SerializedStyles
}
const FooterContainer = styled.div`
  margin-top: 1.3125rem;
`
const AuthTemplate: React.FC<Props> = ({
  pageHeader,
  subTitle,
  bottomText,
  children,
  titleClassName,
  subtitleClassName,
  contentCss
}) => (
  <div css={pageContent}>
    <div className="gradient-bg" />
    <CenteredPageContent>
      <AuthTemplateLogo src={Logo} alt="" />
      <div css={contentCss || FormBox}>
        <div className="mb-40">
          <AuthTitle className={titleClassName || 'text-center'}>
            {pageHeader}
          </AuthTitle>
          {subTitle && (
            <p
              className={subtitleClassName || 'text-center mb-0 mt-10'}
              css={UIBody01}
            >
              {subTitle}
            </p>
          )}
        </div>
        {children}
      </div>
      {bottomText && <AuthHint>{bottomText}</AuthHint>}
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </CenteredPageContent>
  </div>
)

export default AuthTemplate
