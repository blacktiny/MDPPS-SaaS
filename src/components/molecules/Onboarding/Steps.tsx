/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { Steps } from 'rsuite'
import styled from '@emotion/styled'
import variables from '../../../assets/styles/variables'
import { RouteComponentProps, navigate } from '@reach/router'
import { updateOnboarding } from '../../../store/onboarding'

const { Colors, Fonts } = variables

const StepsWrapper = styled.div`
  .progress-step {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      width: 5px;
      background-color: #4284fc;
      z-index: 2;
    }

    &:after {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      width: 5px;
      background-color: #4284fc;
      transition: all ease-out 0.3s;
    }
  }
`

const StepsItem = styled(Steps.Item)`
  padding-bottom: 0 !important;
  overflow: visible;

  &:not(div:first-of-type) {
    margin-top: 64px !important;
  }

  .rs-steps-item-tail {
    top: 20px;
    left: 5px;
    height: calc(100% + 64px);
    border-width: 5px;
    border-color: #e1e8ed;
    background-color: #e1e8ed;
  }

  .rs-steps-item-icon-wrapper {
    top: 5px;
    width: 15px;
    height: 15px;
    overflow: hidden;
    border-width: 3px;
    border-color: #e1e8ed;
    background-color: #e1e8ed;
    cursor: pointer;
    z-index: 9;

    > .rs-steps-item-icon {
      color: transparent;
    }
  }

  .rs-steps-item-title {
    font-size: ${Fonts.Size.XSmall};
    color: #657786;
    opacity: 0.45;
    cursor: pointer;
  }

  &.rs-steps-item-status-process,
  &.rs-steps-item-status-finish {
    .rs-steps-item-title {
      opacity: 1;
    }

    .rs-steps-item-icon-wrapper {
      background-color: ${Colors.Blue[200]};
    }
  }

  &.rs-steps-item-status-process {
    .rs-steps-item-icon-wrapper {
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.31);
      border-color: ${Colors.Gray[25]};
    }

    .rs-steps-item-title {
      color: #657786;
      font-weight: ${Fonts.Weight.Bold};
    }
  }

  &.rs-steps-item-status-finish {
    .rs-steps-item-icon-wrapper {
      border-color: ${Colors.Blue[200]};
    }
  }
`

export interface Step {
  title?: string
  path: string
}
interface Props extends RouteComponentProps {
  steps?: Step[]
  activeStep?: number
  type?: 'twoSteps' | 'threeSteps' | 'fiveSteps'
}
interface widthOptionsType {
  [key: number]: string
}

const OnboardingSteps: React.FC<Props> = ({ steps, activeStep = 0 }) => {
  const store = useStore()
  const dispatch = useDispatch()

  const onboardingInfo = store.getState()?.onboarding

  const currentMaxStep = onboardingInfo ? onboardingInfo.currentMaxStep : activeStep

  useEffect(() => {
    if (currentMaxStep === steps.length - 1) navigate(steps[currentMaxStep].path)
  }, [currentMaxStep, steps])

  const prevStep = useMemo(() => {
    if (onboardingInfo && onboardingInfo.prevStep) {
      return steps.findIndex(step => step.path === onboardingInfo.prevStep)
    }

    return 0
  }, [onboardingInfo, steps])

  const [currentStep, setCurrentStep] = useState(prevStep)
  const [progressHeight, setProgressHeight] = useState(prevStep > 0 ? (100 / (steps.length - 1)) * prevStep : 0)

  useEffect(() => {
    setProgressHeight((100 / (steps.length - 1)) * activeStep)
    setTimeout(() => {
      setCurrentStep(activeStep)
      if (activeStep > currentMaxStep) {
        dispatch(updateOnboarding({ currentMaxStep: activeStep }))
      }
      dispatch(updateOnboarding({ prevStep: steps[activeStep].path }))
    }, 300)
  }, [activeStep, currentMaxStep, dispatch, steps])

  const behaviorProgressHeight =
    currentMaxStep === steps.length - 1
      ? `calc(100% - 20px)`
      : `calc(((100% - 20px) / ${steps.length - 1} * ${currentMaxStep}) + 20px)`

  return (
    <StepsWrapper>
      <Steps
        className="progress-step"
        vertical
        current={currentStep}
        css={
          progressHeight >= 100
            ? css`
                &.progress-step:before {
                  height: ${behaviorProgressHeight};
                }
                &.progress-step:after {
                  height: calc(100% - 20px);
                }
              `
            : css`
                &.progress-step:before {
                  height: ${behaviorProgressHeight};
                }
                &.progress-step:after {
                  height: calc(((100% - 20px) / 100 * ${progressHeight}) + 20px);
                }
              `
        }
      >
        {steps.map((step, i) => (
          <StepsItem
            title={step?.title}
            status={currentMaxStep >= i || currentStep >= i ? (i === currentStep ? 'process' : 'finish') : 'wait'}
            key={i}
            onClick={() => {
              if (currentMaxStep !== steps.length - 1 && activeStep !== steps.length - 1 && i <= currentMaxStep) {
                navigate(steps[i].path)
              }
            }}
          />
        ))}
      </Steps>
    </StepsWrapper>
  )
}

export default OnboardingSteps
