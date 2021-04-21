/* eslint-disable react/no-unescaped-entities */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { Footer } from '../organisms/Footer'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import Logo from '../../assets/images/logo-blue-black.svg'
import signUpSvg from '../../assets/images/undraw_agreement_aajr.svg'
import { LOGIN } from '../../constants/pagesPath'
import rfs, { boxModel, mq } from '../../utils/style'
import Button from '../atoms/Button'
import variables from '../../assets/styles/variables'

const { Fonts } = variables

const AuthTemplateLogo = styled.img`
  max-width: ${boxModel('220px')};
  max-height: 1.75rem;
  height: 100%;
  width: 100%;
  margin-bottom: ${rfs('62px')};
`
const pageContent = css`
  min-height: 100vh;
  display: flex;
  padding: ${rfs('30px')} 0;
  ${mq({
    alignItems: [`flex-start`, ``, `center`]
  })}
`

const CenteredPageContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  background-color: #fff;
  margin: 0 auto ${rfs('28px')};
  overflow: hidden;
`

const SignUpContainer = styled.div`
  height: 100%;
  width: 100%;
`

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f4f6f7;
  ${mq({
    flex: [`0 0 100%`, ``, `0 0 38.73%`]
  })}
  padding: ${rfs('85px')} ${rfs('45px')} ${rfs('70px')} ${rfs('50px')};
`

const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${rfs('45px')} ${rfs('50px')} ${rfs('80px')};
`
const UsingText = styled.p`
  color: #0f203c;
  text-align: left;
  font-size: ${rfs(Fonts.Size.XSmall)};
  line-height: 2;
  &::first-letter {
    text-transform: capitalize;
  }
  margin-bottom: ${rfs('44px')};
`
const FormContainer = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  label {
    color: #14171a;
  }
`
const SignUpH4 = styled.h4`
  font-size: ${rfs('24px')};
  line-height: 1.4;
  font-weight: ${Fonts.Weight.Regular};
  color: #14171a;
  text-align: left;
  &::first-letter {
    text-transform: capitalize;
  }
  margin-bottom: ${rfs('32px')};
`
const SignInLinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${rfs('30px')};
`
const AccountHint = styled.p`
  font-size: ${rfs(Fonts.Size.XSmall)};
  line-height: 1.4;
  font-weight: ${Fonts.Weight.Regular};
  padding-right: ${boxModel('6px')};
  line-height: inherit;
`
const SignUpTitle = styled.h3`
  font-size: ${rfs('32px')};
  line-height: 1.5;
  font-weight: ${Fonts.Weight.Regular};
  color: rgba(20, 23, 26, 0.87);
  text-align: left;
  margin-bottom: ${rfs('32px')};
`
const CenterImage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const BigImageStyle = styled.img`
  height: 100%;
  max-width: 16.25rem;
  max-height: 15.625rem;
`

interface Props {
  pageHeader: string
  subTitle?: string
}
const SignUpTemplate: React.FC<Props> = ({ children }) => (
  <div className="container">
    <div className="row">
      <div className="col-xl-10 offset-xl-1">
        
        <div css={pageContent}>
          <div className="gradient-bg" />

          <SignUpContainer>
            <CenteredPageContent>
              <InformationContainer className="d-none d-md-block">
                <div>
                  <AuthTemplateLogo src={Logo} alt="" />
                  <SignUpH4>A cloud based authorized dealer network and lifecycle management</SignUpH4>
                  <UsingText>
                    More than 5000 authorized dealers and distributors have chosen MDPPS to discover and create relationships
                    with trusted brands.
                  </UsingText>
                  <CenterImage>
                    <BigImageStyle src={signUpSvg} />
                  </CenterImage>
                </div>
              </InformationContainer>

              <SignUpFormContainer>
                <SignInLinkContainer>
                  <AccountHint>Already have an account?</AccountHint>
                  <Button link onClick={() => navigate(LOGIN)}>
                    Sign in
                  </Button>
                </SignInLinkContainer>

                <FormContainer>
                  <SignUpTitle>Create Your Account</SignUpTitle>
                  {children}
                </FormContainer>
              </SignUpFormContainer>
            </CenteredPageContent>

            <Footer />
          </SignUpContainer>
        </div>

      </div>
    </div>
  </div>
)

export default SignUpTemplate
