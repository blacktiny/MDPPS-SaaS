import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate, RouteComponentProps } from '@reach/router'
import Image from '../../../assets/images/customer_finish.svg'
import styled from '@emotion/styled'
import rfs, { boxModel, convertLineHeightToCss, convertPxToAbs } from '../../../utils/style'
import Button from '../../../components/atoms/Button'
import variables from '../../../assets/styles/variables'
import QuestionsTemplate from '../../../components/templates/Onboarding/Questions'
import OnboardingTitle from '../../../components/molecules/Onboarding/OnboardingTitle'
import axios from 'utils/http/client'
import { setUserData } from 'store/auth'
import { RootState } from 'store/types'
import { User } from 'shared/models/User'
import { getActiveStep, getOnboardingSteps } from 'utils/helpers'

const { Fonts, Colors } = variables

const CustomersOnboardingComplete: React.FC<RouteComponentProps> = () => {
  const CompleteWrapper = styled.div`
    font-size: 14px;
    color: #657786;
    padding: 5rem 0;

    & > section {
      min-width: 100%;
      height: fit-content;
      background-color: #ffffff;
      box-sizing: border-box;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h1 {
      color: #3469c7;
      text-align: center;
      line-height: 34px;
      font-size: 34px;
    }

    button {
      width: 16.25rem;
      margin-top: calc(1.3875rem + 1.03125vw);
    }
  `

  const VectorImage = styled.img`
    width: 260px;
    height: 209px;
    box-sizing: border-box;
    font-family: 'Roboto Regular', 'Roboto', sans-serif;
    color: #333333;
    text-align: center;
    line-height: normal;
    margin-bottom: 2.5rem;
  `

  const Message = styled.div`
    width: 80%;
    max-width: 840px;
    text-align: center;
    color: ${Colors.Gray[400]};
    font-weight: ${Fonts.Weight.Regular};
    font-size: ${rfs(Fonts.Size.XSmall)};
    padding-top: ${boxModel('10px', true)};
    letter-spacing: 0.28px;
    line-height: ${convertLineHeightToCss(22, convertPxToAbs(Fonts.Size.XSmall))};
  `

  const dispatch = useDispatch()

  const user = useSelector<RootState>(({ auth }) => auth?.user) as User

  const steps = useMemo(() => {
    return getOnboardingSteps(user)
  }, [user])

  const activeStep = useMemo(() => {
    return getActiveStep(user, 'finish')
  }, [user])

  const completeOnboarding = useCallback(() => {
    const form = new FormData()
    form.set('is_onboarding_complete', 'true')

    axios({
      url: 'users/me',
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: form
    })
      .then(response => {
        const { data, status } = response

        if (status === 200 && data) {
          dispatch(setUserData(response?.data))
          navigate('/dashboard')
        }
      })
      .catch(error => {
        console.log('[API PUT /users/me] error = ', error)
      })
  }, [dispatch])

  return (
    <>
      <QuestionsTemplate steps={steps} activeStep={activeStep}>
        <CompleteWrapper>
          <section style={{ maxWidth: boxModel('614px') }}>
            <VectorImage src={Image} alt="" />
            <OnboardingTitle title={'Congratulations!'} />
            <Message>
              Your new account has been successfully created. You can now begin registering your products for warranty,
              receive product updates, and staying in the know about products and brands that you love.
            </Message>
            <Button pairs onClick={() => completeOnboarding()}>
              View my profile
            </Button>
          </section>
        </CompleteWrapper>
      </QuestionsTemplate>
    </>
  )
}

export default CustomersOnboardingComplete
