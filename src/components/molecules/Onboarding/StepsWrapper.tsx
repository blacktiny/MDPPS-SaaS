/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import rfs from '../../../utils/style'
import styled from '@emotion/styled'
import variables from '../../../assets/styles/variables'
import Button from '../../atoms/Button'
import { ReactComponent as WelcomeImage } from '../../../assets/images/welcome_aboard.svg'

const { Fonts, Colors } = variables

const StepsContent = styled.div`
  max-width: ${rfs('840px')};
  margin: 0 auto;
  padding: ${rfs('130px')} ${rfs('30px')};
  text-align: center;
`

const WelcomeImg = styled(WelcomeImage)`
  display: inline-block;
  max-width: ${rfs('320px')};
  max-height: ${rfs('190px')};
  margin-bottom: ${rfs('60px')};
`

const OnboardingTitle = styled.h3`
  margin-bottom: ${rfs('19px')};
  text-align: center;
  color: ${Colors.Blue[300]};
  font-size: ${Fonts.Size.Medium};
  font-weight: ${Fonts.Weight.Regular};
`

const Message = styled.p`
  color: #657786;
  font-size: ${Fonts.Size.XSmall};
  font-weight: ${Fonts.Weight.Regular};
  line-height: 1.7;
`

const WelcomeButton = styled(Button)`
  width: 100%;
  max-width: ${rfs('266px')};
  margin-top: ${rfs('42px')};
  padding: ${rfs('16px')};
  font-size: ${rfs('16px')};
`

interface Props {
  title: string
  message: string | Array<string | JSX.Element>
  image?: string
  buttonTitle: string
  onClick?: () => void
  isStart?: boolean
}

const OnboardingStepsWrapper: React.FC<Props> = ({ message, title, buttonTitle, onClick }) => {
  return (
    <StepsContent>
      <WelcomeImg />

      <OnboardingTitle>{title}</OnboardingTitle>
      <Message>{message}</Message>

      <WelcomeButton size="md" onClick={onClick}>
        {buttonTitle}
      </WelcomeButton>
    </StepsContent>
  )
}

export default OnboardingStepsWrapper
