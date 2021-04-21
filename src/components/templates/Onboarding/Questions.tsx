import React, { Fragment } from 'react'
import Header from '../../molecules/Onboarding/Header'
import Steps, { Step } from '../../molecules/Onboarding/Steps'
import styled from '@emotion/styled'
import rfs from '../../../utils/style'
import variables from '../../../assets/styles/variables'

const { Colors } = variables

const OnboardingLayoutContainer = styled('div')`
  height: 100vh;
  padding-bottom ${rfs('60px')};

  &.onboarding {
    @media (max-width: 1599px) {
      padding-right: 0px !important;
      padding-left: 0px !important;
    }

    @media (min-width: 1600px) {
      padding-right: 20px !important;
      padding-left: 20px !important;
    }
  }
`

const StepContent = styled('div')`
  min-height: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: ${Colors.Gray[25]};
`

interface Props {
  title?: string
  description?: Array<JSX.Element | string> | string
  steps?: Step[]
  activeStep?: number
}

const QuestionsTemplate: React.FC<Props> = ({ children, steps, activeStep }) => {
  return (
    <Fragment>
      <OnboardingLayoutContainer className="container onboarding">
        <div className="row">
          <div className="col-10 offset-1">
            <Header isOnboarding />
          </div>
        </div>

        <div className="row">
          <div className="col-2 offset-1">{steps?.length && <Steps steps={steps} activeStep={activeStep} />}</div>
          <div className="col-8">
            <StepContent>{children}</StepContent>
          </div>
        </div>
      </OnboardingLayoutContainer>
    </Fragment>
  )
}

export default QuestionsTemplate
