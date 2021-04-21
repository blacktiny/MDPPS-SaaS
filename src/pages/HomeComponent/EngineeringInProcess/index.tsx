import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import styled from '@emotion/styled'
import Button from '../../../components/atoms/Button'
import engineeringInProcessPic from '../../../assets/images/undraw_in_progress_ql66.svg'

export type Props = RouteComponentProps

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin: 11.4375rem 0px 0px 0px;
  justify-content: center;
`
const ContainerCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
`
const ContainerLeft = styled.div`
  text-align: left;
  max-width: 43.4375rem;
  margin-right: 13.5rem;
  h1 {
    margin-top: 1.0625rem;
    color: #3469c7;
    font-size: 2.125rem;
  }
  .paragraph {
    margin-top: 1.6875rem;
    margin-bottom: 2.9375rem;
    font-size: 1.125rem;
    color: #657786;
    line-height: 1.75rem;
  }
`
const StyledButton = styled(Button)`
  font-size: 1rem;
  width: 16.125rem;
  height: 3.6875rem;
  text-align: center;
  padding: 0px;
  &:focus {
    padding: 0px;
  }
  &:focus&:active {
    padding: 0px;
  }
`
const ContainerRight = styled.div`
  width: 100%;
  height: 100%;
  max-width: 31.25rem;
  max-height: 23.25rem;
`
const RightImg = styled.img`
  transform: rotateY(180deg);
  width: 100%;
  height: 100%;
`

const EngineeringInProcess: React.FC<Props> = () => {
  function handleGoBackButtonClick() {
    navigate(-1)
  }
  return (
    <Container>
      <ContainerCenter>
        <ContainerLeft>
          <h1>Engineering in Process</h1>
          <div className="paragraph">
            <p>
              The feature you have requested is still under development. Our
              team is working hard to engineer and deliver intelligent apps that
              continue to increase operational efficiency and grown your
              business beyond the distribution network.
            </p>
            <p>
              Update your notification settings to be the first to know about
              new product features, updates, and news.
            </p>
          </div>
          <StyledButton onClick={handleGoBackButtonClick}>Go Back</StyledButton>
        </ContainerLeft>
        <ContainerRight>
          <RightImg src={engineeringInProcessPic} alt="work_in_progress" />
        </ContainerRight>
      </ContainerCenter>
    </Container>
  )
}
export default EngineeringInProcess
