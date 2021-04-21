import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import OnboardingStepsWrapper from '../../../components/molecules/Onboarding/StepsWrapper'
import Image from '../../../assets/images/welcome_aboard.svg'
import styled from '@emotion/styled'
import { STEPS } from './Steps'
import QuestionsTemplate from '../../../components/templates/Onboarding/Questions'

import rfs from '../../../utils/style'

const BrandsOnboardingStart: React.FC<RouteComponentProps> = () => {
  const navigateToPersonal = () => navigate('personal')

  const StartWrapper = styled.div`
    font-size: ${rfs('14px')};
    color: #657786;

    & > section {
      width: 70.625rem;
      flex: 1;
      margin: 0 !important;
      height: 720px;
      background-color: #ffffff;
      box-sizing: border-box;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    img {
      width: ${rfs('320px')};
      height: 190px;
      box-sizing: border-box;
      font-family: 'Roboto Regular', 'Roboto', sans-serif;
      color: #333333;
      text-align: center;
      line-height: normal;
      margin-top: 10rem;
    }

    h1 {
      color: #3469c7;
      text-align: center;
      line-height: 34px;
    }

    button {
      width: 16.25rem;
      max-width: initial;
    }
  `

  return (
    <QuestionsTemplate steps={STEPS} activeStep={0}>
      <StartWrapper>
        <OnboardingStepsWrapper
          isStart={true}
          title={'Welcome aboard!'}
          message={
            'Thank you for joining our ecosystem of forward thinking brands that are using our common dealer application and cloud based authorized dealer network to grow their businesses faster, gain operational agility, and make better decisions.'
          }
          image={Image}
          buttonTitle={'Get Started'}
          onClick={() => navigateToPersonal()}
        />
      </StartWrapper>
    </QuestionsTemplate>
  )
}

export default BrandsOnboardingStart
